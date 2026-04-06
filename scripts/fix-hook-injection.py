#!/usr/bin/env python3
"""
Fix hook injection in screen files:
1. Remove hooks that were injected inside nested helper functions (non-component functions)
2. Insert hooks correctly at the start of component functions (PascalCase names or exports)
"""

import re
import os
import sys

HOOK_CODE = "  const { colors: c } = useAppTheme();\n  const styles = useMemo(() => makeStyles(c), [c]);"
HOOK_PATTERN = r'  const \{ colors: c \} = useAppTheme\(\);\n  const styles = useMemo\(\(\) => makeStyles\(c\), \[c\]\);'

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if no hook in file (not yet migrated)
    if 'useAppTheme' not in content or 'makeStyles' not in content:
        return False, 'no_hook'
    
    original = content
    
    # Step 1: Remove ALL existing hook injections (we'll re-add them correctly)
    content = re.sub(HOOK_PATTERN + r'\n', '', content)
    content = re.sub(HOOK_PATTERN, '', content)
    
    # Step 2: Find and inject hooks in the right places
    # A "component function" in this codebase is either:
    # a) const PascalCase = (...) => {   (sub-component)
    # b) export const PascalCase = (...) => {  (exported screen)
    # c) export default function PascalCase(...) {  (rare)
    
    # We match lines at the start of a line (not indented) that define components
    # PascalCase name determination: starts with uppercase
    
    component_pattern = re.compile(
        r'^((?:export )?(?:const|function) ([A-Z]\w*)\b)',
        re.MULTILINE
    )
    
    insertions = []
    
    for m in component_pattern.finditer(content):
        comp_name = m.group(2)
        # Skip if name looks like a config or constant (ALL_CAPS = module-level const)
        if comp_name.upper() == comp_name:
            continue
        
        # Find the opening { of this component (its body)
        start_search = m.end()
        # The function body opens after the =>  { for arrow functions, or right after () for functions
        # Scan forward to find the { that opens the body
        brace_start = None
        
        # Look for => { (arrow function)
        bracket_region = content[start_search:start_search + 300]
        arrow_match = re.search(r'=>\s*\{', bracket_region)
        func_match = re.search(r'\)\s*\{', bracket_region)
        
        if arrow_match:
            brace_start = start_search + arrow_match.end()
        elif func_match:
            brace_start = start_search + func_match.end()
        else:
            continue
        
        # Find end of this component (next top-level component or end of file)
        next_component = component_pattern.search(content, m.end() + 1)
        body_end = next_component.start() if next_component else len(content)
        body = content[brace_start:body_end]
        
        # Check if this component uses `styles.` in its body
        if 'styles.' in body:
            insertions.append((brace_start, '\n' + HOOK_CODE + '\n'))
    
    # Apply insertions in reverse order to preserve positions
    for pos, text in reversed(insertions):
        content = content[:pos] + text + content[pos:]
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, 'fixed'
    
    return False, 'unchanged'

def main():
    base = '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens'
    fixed = 0
    skipped = 0
    
    for root, dirs, files in os.walk(base):
        dirs[:] = [d for d in dirs if d != '__tests__']
        for fname in sorted(files):
            if not fname.endswith('.tsx'):
                continue
            fpath = os.path.join(root, fname)
            result, reason = fix_file(fpath)
            rel = os.path.relpath(fpath, base)
            if result:
                fixed += 1
                print(f'  fixed: {rel}')
            elif reason == 'no_hook':
                pass  # not relevant
            else:
                skipped += 1
    
    print(f'\nDone: {fixed} fixed, {skipped} unchanged')

if __name__ == '__main__':
    main()
