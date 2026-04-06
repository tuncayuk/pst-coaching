#!/usr/bin/env python3
"""
Fix palette.* raw token usage inside makeStyles factories and component JSX.

Rules (all apply only INSIDE makeStyles function bodies):
  backgroundColor: palette.white         → c.surface
  backgroundColor: palette.neutral100    → c.surfaceVariant
  backgroundColor: palette.cyan50        → c.primaryContainer
  backgroundColor: palette.cyan100       → c.primaryContainer
  backgroundColor: palette.emerald50     → c.tertiaryContainer
  backgroundColor: palette.emerald100    → c.tertiaryContainer
  backgroundColor: palette.purple50      → c.secondaryContainer
  backgroundColor: palette.purple100     → c.secondaryContainer
  backgroundColor: palette.purple200     → c.secondaryContainer
  backgroundColor: palette.amber50       → c.warningContainer
  backgroundColor: palette.red50         → c.errorContainer

  color: palette.cyan600                 → c.onPrimaryContainer
  color: palette.red500                  → c.error
  color: palette.red600                  → c.error
  color: palette.red900                  → c.onErrorContainer
  color: palette.neutral400              → c.textDisabled

  borderColor/borderTopColor/borderBottomColor/borderLeftColor/borderRightColor:
    palette.neutral100                   → c.outlineVariant
    palette.red500                       → c.error
    palette.red600                       → c.error

  borderLeftColor: palette.red500        → c.error

Notes:
  - `color: palette.white` is intentionally LEFT alone — it's always on colored surfaces
    where white text is correct (primary buttons, cyan icons, etc.)
  - Hardcoded hex colors in decorative arrays (JOURNEY_COLORS etc.) are left alone
  - Only replacements inside makeStyles() function bodies are made
"""

import re
import os
import sys

# ---------------------------------------------------------------------------
# Replacement rules: (find_pattern, replacement)
# Order matters — more specific first.
# ---------------------------------------------------------------------------
REPLACEMENTS = [
    # Backgrounds — sorted by specificity
    (r'\bbackgroundColor:\s*palette\.white\b', 'backgroundColor: c.surface'),
    (r'\bbackgroundColor:\s*palette\.neutral100\b', 'backgroundColor: c.surfaceVariant'),
    (r'\bbackgroundColor:\s*palette\.cyan50\b', 'backgroundColor: c.primaryContainer'),
    (r'\bbackgroundColor:\s*palette\.cyan100\b', 'backgroundColor: c.primaryContainer'),
    (r'\bbackgroundColor:\s*palette\.emerald50\b', 'backgroundColor: c.tertiaryContainer'),
    (r'\bbackgroundColor:\s*palette\.emerald100\b', 'backgroundColor: c.tertiaryContainer'),
    (r'\bbackgroundColor:\s*palette\.purple50\b', 'backgroundColor: c.secondaryContainer'),
    (r'\bbackgroundColor:\s*palette\.purple100\b', 'backgroundColor: c.secondaryContainer'),
    (r'\bbackgroundColor:\s*palette\.purple200\b', 'backgroundColor: c.secondaryContainer'),
    (r'\bbackgroundColor:\s*palette\.amber50\b', 'backgroundColor: c.warningContainer'),
    (r'\bbackgroundColor:\s*palette\.red50\b', 'backgroundColor: c.errorContainer'),

    # Text colors
    (r'\bcolor:\s*palette\.cyan600\b', 'color: c.onPrimaryContainer'),
    (r'\bcolor:\s*palette\.red500\b', 'color: c.error'),
    (r'\bcolor:\s*palette\.red600\b', 'color: c.error'),
    (r'\bcolor:\s*palette\.red900\b', 'color: c.onErrorContainer'),
    (r'\bcolor:\s*palette\.neutral400\b', 'color: c.textDisabled'),

    # Border colors
    (r'\bborderColor:\s*palette\.neutral100\b', 'borderColor: c.outlineVariant'),
    (r'\bborderTopColor:\s*palette\.neutral100\b', 'borderTopColor: c.outlineVariant'),
    (r'\bborderBottomColor:\s*palette\.neutral100\b', 'borderBottomColor: c.outlineVariant'),
    (r'\bborderLeftColor:\s*palette\.red500\b', 'borderLeftColor: c.error'),
    (r'\bborderLeftColor:\s*palette\.red600\b', 'borderLeftColor: c.error'),
    (r'\bborderColor:\s*palette\.red500\b', 'borderColor: c.error'),
    (r'\bborderColor:\s*palette\.red600\b', 'borderColor: c.error'),
]

# Also handle JSX inline styles (outside makeStyles, inside JSX props like style={{...}})
# These use the same patterns but may be in the JSX body.
JSX_REPLACEMENTS = [
    # Only backgroundColor: palette.white in style props in JSX that are form-field backgrounds
    # We're more conservative here — only target input backgrounds
]

def extract_makestyles_range(content):
    """Find the start/end of the makeStyles function body."""
    start = content.find('function makeStyles(c: ColorTokens)')
    if start == -1:
        return None, None
    # Find the opening brace
    brace_start = content.find('{', start)
    if brace_start == -1:
        return None, None
    
    # Count braces to find matching close (last } in file = end of makeStyles)
    # Since makeStyles is always the last thing in the file, search from end
    end = content.rfind('}')
    if end == -1:
        return None, None
    
    return brace_start, end + 1

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'makeStyles' not in content:
        return False, 'no_makestyles'
    
    original = content
    
    ms_start, ms_end = extract_makestyles_range(content)
    if ms_start is None:
        return False, 'no_range'
    
    before = content[:ms_start]
    makestyles_body = content[ms_start:ms_end]
    after = content[ms_end:]
    
    # Apply replacements only inside makeStyles body
    for pattern, replacement in REPLACEMENTS:
        makestyles_body = re.sub(pattern, replacement, makestyles_body)
    
    content = before + makestyles_body + after
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, 'fixed'
    
    return False, 'unchanged'

def main():
    bases = [
        '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens',
        '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/components',
    ]
    
    fixed = 0
    unchanged = 0
    
    for base in bases:
        for root, dirs, files in os.walk(base):
            dirs[:] = [d for d in dirs if d != '__tests__']
            for fname in sorted(files):
                if not fname.endswith('.tsx') and not fname.endswith('.ts'):
                    continue
                fpath = os.path.join(root, fname)
                result, reason = fix_file(fpath)
                rel = os.path.relpath(fpath, base.split('/')[:-1][-1] + '/' + base.split('/')[-1]) if '/' in base else fpath
                if result:
                    fixed += 1
                    print(f'  fixed: {os.path.relpath(fpath, "/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile")}')
                else:
                    unchanged += 1
    
    print(f'\nDone: {fixed} fixed, {unchanged} unchanged')

if __name__ == '__main__':
    main()
