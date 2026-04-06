#!/usr/bin/env python3
"""
Migrate React Native screen files to support dark mode via useAppTheme hook.
For each file:
  1. Add useMemo to React import
  2. Add/update theme import with useAppTheme + ColorTokens
  3. Convert const styles = StyleSheet.create({...}) -> function makeStyles(c: ColorTokens) { return StyleSheet.create({...}); }
  4. Replace hardcoded color/size tokens with theme tokens
  5. Insert useAppTheme hook into component functions that use `styles`
"""

import re
import os
import sys

# ---------------------------------------------------------------------------
# Token replacement maps
# ---------------------------------------------------------------------------
COLOR_REPLACEMENTS = [
    # backgrounds / surfaces
    ("'#FAFAFA'", "c.background"),
    ("'#F5F5F5'", "c.surfaceVariant"),
    ("'#FFFFFF'", "palette.white"),
    # text
    ("'#171717'", "c.textPrimary"),
    ("'#525252'", "c.textSecondary"),
    ("'#404040'", "c.textTertiary"),
    ("'#737373'", "c.textTertiary"),
    ("'#6B7280'", "c.textTertiary"),
    ("'#2B1B5D'", "c.textBrand"),
    # brand
    ("'#00B4D8'", "c.primary"),
    ("'#0097A7'", "c.primaryContainer"),
    ("'#10B981'", "c.tertiary"),
    ("'#16A34A'", "c.success"),
    # borders
    ("'#D4D4D4'", "c.outline"),
    ("'#E5E5E5'", "c.outlineVariant"),
    # status
    ("'#EF4444'", "palette.red500"),
    ("'#DC2626'", "palette.red600"),
    ("'#FEE2E2'", "palette.red50"),
    ("'#991B1B'", "palette.red900"),
    # containers
    ("'#E0F7FA'", "palette.cyan50"),
    ("'#B2EBF2'", "palette.cyan100"),
    ("'#D1FAE5'", "palette.emerald50"),
    ("'#FEF3C7'", "c.warningContainer"),
    ("'#FEF9C3'", "c.warningContainer"),
    ("'#EDE9FE'", "palette.purple50"),
    ("'#EDE7F6'", "palette.purple50"),
    ("'#E9D5FF'", "palette.purple50"),
    ("'#A7F3D0'", "palette.emerald100"),
    # error container
    ("'#FEF2F2'", "c.errorContainer"),
]

FONT_SIZE_REPLACEMENTS = [
    ("fontSize: 64", "fontSize: fontSizes['12xl']"),
    ("fontSize: 48", "fontSize: fontSizes['11xl']"),
    ("fontSize: 36", "fontSize: fontSizes['10xl']"),
    ("fontSize: 32", "fontSize: fontSizes['9xl']"),
    ("fontSize: 28", "fontSize: fontSizes['8xl']"),
    ("fontSize: 26", "fontSize: fontSizes['7xl']"),
    ("fontSize: 24", "fontSize: fontSizes['6xl']"),
    ("fontSize: 22", "fontSize: fontSizes['5xl']"),
    ("fontSize: 20", "fontSize: fontSizes['4xl']"),
    ("fontSize: 18", "fontSize: fontSizes['3xl']"),
    ("fontSize: 16", "fontSize: fontSizes['2xl']"),
    ("fontSize: 15", "fontSize: fontSizes.xl"),
    ("fontSize: 14", "fontSize: fontSizes.lg"),
    ("fontSize: 13", "fontSize: fontSizes.md"),
    ("fontSize: 12", "fontSize: fontSizes.base"),
    ("fontSize: 11", "fontSize: fontSizes.sm"),
    ("fontSize: 9",  "fontSize: fontSizes.xs"),
]

FONT_WEIGHT_REPLACEMENTS = [
    ("fontWeight: '900'", "fontWeight: fontWeights.black"),
    ("fontWeight: '800'", "fontWeight: fontWeights.extraBold"),
    ("fontWeight: '700'", "fontWeight: fontWeights.bold"),
    ("fontWeight: '600'", "fontWeight: fontWeights.semiBold"),
    ("fontWeight: '500'", "fontWeight: fontWeights.medium"),
    ("fontWeight: '400'", "fontWeight: fontWeights.regular"),
]

BORDER_RADIUS_REPLACEMENTS = [
    ("borderRadius: 999", "borderRadius: radii.full"),
    ("borderRadius: 24", "borderRadius: radii['3xl']"),
    ("borderRadius: 20", "borderRadius: radii['2xl']"),
    ("borderRadius: 16", "borderRadius: radii.xl"),
    ("borderRadius: 14", "borderRadius: radii.xl"),
    ("borderRadius: 12", "borderRadius: radii.lg"),
    ("borderRadius: 10", "borderRadius: radii.md"),  
    ("borderRadius: 8",  "borderRadius: radii.md"),
    ("borderRadius: 6",  "borderRadius: radii.sm"),
    ("borderRadius: 4",  "borderRadius: radii.sm"),
    ("borderRadius: 2",  "borderRadius: radii.xs"),
]

SPACING_REPLACEMENTS = [
    ("padding: 48",    "padding: spacing[6]"),
    ("padding: 40",    "padding: spacing[5]"),
    ("padding: 32",    "padding: spacing[4]"),
    ("padding: 24",    "padding: spacing[3]"),
    ("padding: 20",    "padding: spacing[2.5]"),
    ("padding: 16",    "padding: spacing[2]"),
    ("padding: 12",    "padding: spacing[1.5]"),
    ("padding: 8",     "padding: spacing[1]"),
    ("paddingHorizontal: 32",    "paddingHorizontal: spacing[4]"),
    ("paddingHorizontal: 24",    "paddingHorizontal: spacing[3]"),
    ("paddingHorizontal: 20",    "paddingHorizontal: spacing[2.5]"),
    ("paddingHorizontal: 16",    "paddingHorizontal: spacing[2]"),
    ("paddingHorizontal: 12",    "paddingHorizontal: spacing[1.5]"),
    ("paddingHorizontal: 8",     "paddingHorizontal: spacing[1]"),
    ("paddingVertical: 24",      "paddingVertical: spacing[3]"),
    ("paddingVertical: 20",      "paddingVertical: spacing[2.5]"),
    ("paddingVertical: 16",      "paddingVertical: spacing[2]"),
    ("paddingVertical: 12",      "paddingVertical: spacing[1.5]"),
    ("paddingVertical: 8",       "paddingVertical: spacing[1]"),
    ("marginBottom: 48",  "marginBottom: spacing[6]"),
    ("marginBottom: 40",  "marginBottom: spacing[5]"),
    ("marginBottom: 32",  "marginBottom: spacing[4]"),
    ("marginBottom: 24",  "marginBottom: spacing[3]"),
    ("marginBottom: 20",  "marginBottom: spacing[2.5]"),
    ("marginBottom: 16",  "marginBottom: spacing[2]"),
    ("marginBottom: 12",  "marginBottom: spacing[1.5]"),
    ("marginBottom: 8",   "marginBottom: spacing[1]"),
    ("marginTop: 32",   "marginTop: spacing[4]"),
    ("marginTop: 24",   "marginTop: spacing[3]"),
    ("marginTop: 20",   "marginTop: spacing[2.5]"),
    ("marginTop: 16",   "marginTop: spacing[2]"),
    ("marginTop: 12",   "marginTop: spacing[1.5]"),
    ("marginTop: 8",    "marginTop: spacing[1]"),
    ("gap: 24",   "gap: spacing[3]"),
    ("gap: 20",   "gap: spacing[2.5]"),
    ("gap: 16",   "gap: spacing[2]"),
    ("gap: 12",   "gap: spacing[1.5]"),
    ("gap: 8",    "gap: spacing[1]"),
]

def get_theme_import(file_path):
    """Compute relative import path for theme based on directory depth."""
    parts = file_path.split(os.sep)
    screens_idx = next((i for i, p in enumerate(parts) if p == 'screens'), -1)
    if screens_idx == -1:
        return "from '../theme'"
    depth = len(parts) - screens_idx - 2  # -2 for 'screens' and filename
    prefix = '../' * (depth + 1)
    return f"from '{prefix}theme'"

def update_react_import(content):
    """Add useMemo to React import."""
    # Match: import React from 'react'; or import React, { ... } from 'react';
    m = re.search(r"import React(?:, \{([^}]*)\})? from 'react';", content)
    if not m:
        return content
    existing = m.group(1) or ''
    hooks = [h.strip() for h in existing.split(',') if h.strip()]
    if 'useMemo' not in hooks:
        hooks.append('useMemo')
        hooks.sort()
    hooks_str = ', '.join(hooks)
    new_import = f"import React, {{ {hooks_str} }} from 'react';"
    return content.replace(m.group(0), new_import, 1)

def update_theme_import(content, import_suffix):
    """Add or update theme import to include useAppTheme and ColorTokens."""
    theme_import_pattern = re.compile(r"import \{([^}]+)\} from '([^']*theme[^']*)'")
    m = theme_import_pattern.search(content)
    
    required = {'ColorTokens', 'fontSizes', 'fontWeights', 'palette', 'radii', 'spacing', 'useAppTheme'}
    
    if m:
        existing_imports = [x.strip() for x in m.group(1).split(',') if x.strip()]
        all_imports = sorted(set(existing_imports) | required - {'light', 'dark'})
        # Remove light/dark since we use useAppTheme
        all_imports = [x for x in all_imports if x not in ('light', 'dark')]
        new_import = f"import {{ {', '.join(all_imports)} }} from '{m.group(2)}';"
        return content[:m.start()] + new_import + content[m.end():]
    else:
        # No theme import — add one before the local component imports (after last node_modules import)
        # Find insertion point: last import line
        lines = content.split('\n')
        last_import_idx = 0
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import_idx = i
        
        new_line = f"import {{ ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme }} {import_suffix};"
        lines.insert(last_import_idx + 1, new_line)
        return '\n'.join(lines)

def convert_stylesheet(content):
    """Convert const styles = StyleSheet.create({...}); to makeStyles factory."""
    # Replace the opening
    content = re.sub(
        r'const styles = StyleSheet\.create\(\{',
        'function makeStyles(c: ColorTokens) {\n  return StyleSheet.create({',
        content,
        count=1
    )
    # Replace the closing `});` at the end (last occurrence)
    # Find the last `});` that ends a StyleSheet
    idx = content.rfind('});')
    if idx != -1 and not content[idx+3:].strip():
        content = content[:idx] + '  });\n}' + content[idx+3:]
    return content

def apply_token_replacements(content):
    """Apply color, font, spacing token replacements inside StyleSheet sections."""
    # Only replace inside StyleSheet.create blocks (after the function declaration)
    stylesheet_start = content.find('function makeStyles(c: ColorTokens)')
    if stylesheet_start == -1:
        return content
    
    before = content[:stylesheet_start]
    after = content[stylesheet_start:]
    
    for old, new in COLOR_REPLACEMENTS:
        after = after.replace(old, new)
    for old, new in FONT_SIZE_REPLACEMENTS:
        after = after.replace(old, new)
    for old, new in FONT_WEIGHT_REPLACEMENTS:
        after = after.replace(old, new)
    for old, new in BORDER_RADIUS_REPLACEMENTS:
        after = after.replace(old, new)
    for old, new in SPACING_REPLACEMENTS:
        after = after.replace(old, new)
    
    return before + after

def insert_hooks(content):
    """
    For each top-level arrow function or function that uses `styles.`,
    insert the useAppTheme hook at the start of its body.
    """
    # We'll insert `const { colors: c } = useAppTheme();\n  const styles = useMemo(() => makeStyles(c), [c]);`
    # right after the opening { of any component function that references `styles.`
    
    hook_code = "  const { colors: c } = useAppTheme();\n  const styles = useMemo(() => makeStyles(c), [c]);"
    
    # Pattern: const XxxComponent = (...) => { followed eventually by styles.
    # OR: export const Xxx = (...) => { 
    # OR: function Xxx(...) {
    # OR: export default function Xxx(...) {
    
    # Strategy: find all component function opens, check if styles. is used before the next function open
    # Simple heuristic: find arrow functions or function declarations
    
    # Match component function opening lines
    func_open_pattern = re.compile(
        r'((?:export (?:const|default function)|const) \w+ = (?:\([^)]*\)|[^=]+) =>|function \w+\([^)]*\))\s*\{',
        re.MULTILINE
    )
    
    insertions = []
    for m in func_open_pattern.finditer(content):
        # Find the position right after the opening {
        brace_pos = m.end()
        # Check if this function body uses `styles.` before the next function definition
        next_func = func_open_pattern.search(content, brace_pos)
        body_end = next_func.start() if next_func else len(content)
        body = content[brace_pos:body_end]
        
        if 'styles.' in body and hook_code not in body:
            insertions.append((brace_pos, '\n' + hook_code))
    
    # Apply insertions in reverse order to preserve positions
    for pos, text in reversed(insertions):
        content = content[:pos] + text + content[pos:]
    
    return content

def migrate_file(file_path):
    """Migrate a single file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already migrated
    if 'useAppTheme' in content:
        return False
    
    # Skip if no StyleSheet
    if 'StyleSheet.create' not in content:
        return False
    
    import_suffix = get_theme_import(file_path)
    
    content = update_react_import(content)
    content = update_theme_import(content, import_suffix)
    content = convert_stylesheet(content)
    content = apply_token_replacements(content)
    content = insert_hooks(content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

if __name__ == '__main__':
    base = '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens'
    migrated = 0
    skipped = 0
    
    for root, dirs, files in os.walk(base):
        # Skip test directories
        dirs[:] = [d for d in dirs if d != '__tests__']
        for fname in sorted(files):
            if not fname.endswith('.tsx'):
                continue
            fpath = os.path.join(root, fname)
            result = migrate_file(fpath)
            if result:
                migrated += 1
                print(f'  migrated: {os.path.relpath(fpath, base)}')
            else:
                skipped += 1
    
    print(f'\nDone: {migrated} migrated, {skipped} skipped')
