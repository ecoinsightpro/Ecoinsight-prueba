#!/usr/bin/env python3
"""Regenerate EcoInsight.html from source JSX files."""
import os, sys

REPO = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(REPO, 'project', 'app')
OUT  = os.path.join(REPO, 'EcoInsight.html')
BASE = os.path.join(REPO, 'EcoInsight.html')   # existing file to take header from

# Read static header up to and including the <script type="text/babel"> line
header_lines = []
with open(BASE, 'r', encoding='utf-8') as f:
    for line in f:
        header_lines.append(line)
        if line.strip() == '<script type="text/babel">':
            break

header = ''.join(header_lines)

# JSX files in correct load order
JSX_ORDER = [
    'data.jsx',
    'feed.jsx',
    'intro.jsx',
    'chrome.jsx',
    'dashboard.jsx',
    'news.jsx',
    'calculator.jsx',
    'solutions.jsx',
    'regulations.jsx',
    'app.jsx',
]

parts = [header]

for fname in JSX_ORDER:
    path = os.path.join(SRC, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    # escape </script> inside JSX to prevent early script termination
    content = content.replace('</script>', '<\\/script>')
    parts.append(f'\n/* ══ {fname} ══ */\n')
    parts.append(content)
    parts.append('\n')

parts.append('\n</script>\n</body>\n</html>\n')

output = ''.join(parts)

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(output)

size_kb = os.path.getsize(OUT) // 1024
print(f'Built {OUT} ({size_kb} KB)')
