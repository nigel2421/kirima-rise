import os
import re

files_to_check = [
    ('index.html', ''),
    ('about/index.html', 'about'),
    ('our-heritage/index.html', 'our-heritage'),
    ('sample-page/index.html', 'sample-page'),
    ('sw/index.html', 'sw'),
    ('sw/about/index.html', 'sw/about'),
    ('sw/our-heritage/index.html', 'sw/our-heritage'),
    ('sw/sample-page/index.html', 'sw/sample-page'),
]

errors = []
total_checked = 0

for filepath, rel_dir in files_to_check:
    if not os.path.exists(filepath):
        errors.append(f"File missing: {filepath}")
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all href and src relative assets
    matches = re.findall(r'(?:href|src)=["\']([^"\'#:]+)["\']', content)
    for ref in matches:
        # Ignore external or anchors or data uris or mailto/tel/js
        if ref.startswith(('http', '//', 'mailto:', 'tel:', 'data:', 'javascript:')):
            continue

        total_checked += 1
        # Resolve target relative to file's directory
        target_path = os.path.normpath(os.path.join(rel_dir, ref.split('?')[0]))
        if not os.path.exists(target_path):
            errors.append(f"Broken asset in {filepath}: '{ref}' -> '{target_path}' not found")

print(f"Checked {total_checked} relative asset links across all 8 files.")
if errors:
    print(f"Found {len(errors)} issues:")
    for err in errors[:20]:
        print(" -", err)
else:
    print("ALL 100% of relative asset and page links resolve to valid files on disk!")
