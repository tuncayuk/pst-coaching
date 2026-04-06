#!/usr/bin/env python3
"""Fix hardcoded buttonColor/textColor JSX props in discover/content screens."""
import os

BASE = os.path.join(os.path.dirname(__file__), '..', 'apps', 'mobile', 'screens')

REPLACEMENTS = [
    # Sort chip: selected = brand secondary, unselected = surface variant
    ("buttonColor={selectedSort === label ? '#2B1B5D' : '#F5F5F5'}",
     "buttonColor={selectedSort === label ? c.secondary : c.surfaceVariant}"),
    ("textColor={selectedSort === label ? '#FFFFFF' : '#525252'}",
     "textColor={selectedSort === label ? c.onSecondary : c.textSecondary}"),

    # Level chip (journeys)
    ("buttonColor={selectedLevel === lvl.key ? '#00B4D8' : 'transparent'}",
     "buttonColor={selectedLevel === lvl.key ? c.primary : 'transparent'}"),
    ("textColor={selectedLevel === lvl.key ? '#FFFFFF' : '#2B1B5D'}",
     "textColor={selectedLevel === lvl.key ? c.onPrimary : c.textBrand}"),

    # Category chip (ebooks)
    ("buttonColor={selectedCategory === cat ? '#00B4D8' : 'transparent'}",
     "buttonColor={selectedCategory === cat ? c.primary : 'transparent'}"),
    ("textColor={selectedCategory === cat ? '#FFFFFF' : '#2B1B5D'}",
     "textColor={selectedCategory === cat ? c.onPrimary : c.textBrand}"),

    # Topic chip (modules)
    ("buttonColor={selectedTopic === topic.key ? '#00B4D8' : 'transparent'}",
     "buttonColor={selectedTopic === topic.key ? c.primary : 'transparent'}"),
    ("textColor={selectedTopic === topic.key ? '#FFFFFF' : '#2B1B5D'}",
     "textColor={selectedTopic === topic.key ? c.onPrimary : c.textBrand}"),

    # Type chip (workshops)
    ("buttonColor={selectedType === opt.key ? '#00B4D8' : 'transparent'}",
     "buttonColor={selectedType === opt.key ? c.primary : 'transparent'}"),
    ("textColor={selectedType === opt.key ? '#FFFFFF' : '#2B1B5D'}",
     "textColor={selectedType === opt.key ? c.onPrimary : c.textBrand}"),

    # Duration chip (assistant questions)
    ("buttonColor={duration === option.value ? '#2B1B5D' : 'transparent'}",
     "buttonColor={duration === option.value ? c.secondary : 'transparent'}"),
    ("textColor={duration === option.value ? '#FFFFFF' : '#2B1B5D'}",
     "textColor={duration === option.value ? c.onSecondary : c.textBrand}"),

    # isActive chip (assistant questions)
    ("buttonColor={isActive ? '#2B1B5D' : 'transparent'}",
     "buttonColor={isActive ? c.secondary : 'transparent'}"),
    ("textColor={isActive ? '#FFFFFF' : '#2B1B5D'}",
     "textColor={isActive ? c.onSecondary : c.textBrand}"),

    # Plain CTA buttons
    ('buttonColor="#2B1B5D"', 'buttonColor={c.secondary}'),
    ('textColor="#2B1B5D"',   'textColor={c.secondary}'),
    ('textColor="#DC2626"',   'textColor={c.error}'),
    ('textColor="#00B4D8"',   'textColor={c.primary}'),
]

TARGET_FILES = [
    'discover/DiscoverJourneysScreen.tsx',
    'discover/DiscoverModulesScreen.tsx',
    'discover/DiscoverWorkshopsScreen.tsx',
    'discover/DiscoverEbooksScreen.tsx',
    'discover/DiscoverAssistantQuestionsScreen.tsx',
    'content/ContentEbookDetailScreen.tsx',
]

for rel in TARGET_FILES:
    path = os.path.join(BASE, rel)
    if not os.path.exists(path):
        print(f'  SKIP (not found): {rel}')
        continue
    with open(path) as f:
        content = f.read()
    orig = content
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    if content != orig:
        with open(path, 'w') as f:
            f.write(content)
        print(f'  fixed: {rel}')
    else:
        print(f'  no change: {rel}')

print('Done.')
