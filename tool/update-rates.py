#!/usr/bin/env python3
"""
Update ITE database with correct values from ITE 11th Edition extracted data.
"""

import json
import re

# Load extracted ITE 11th Edition data
with open('data/ite_11th_primary.json', 'r') as f:
    extracted = json.load(f)

# Read database file
with open('assets/js/ite-database.js', 'r') as f:
    db_content = f.read()

updates_made = []

for code, ext_data in extracted.items():
    # Find the code in the database
    pattern = rf'"{code}":\s*\{{'
    match = re.search(pattern, db_content)
    if not match:
        continue

    # Update AM peak if it exists
    if ext_data.get('am_peak'):
        am = ext_data['am_peak']

        # Find and update AM peak rate
        if am.get('rate'):
            am_rate_pattern = rf'("{code}"[^}}]*am_peak:\s*\{{[^}}]*rate:\s*)[\d.]+([^}}]*\}})'
            db_content = re.sub(am_rate_pattern,
                rf'\g<1>{am["rate"]}\g<2>', db_content, count=1)

        # Find and update AM peak entering/exiting
        if am.get('entering') and am.get('exiting'):
            am_enter_pattern = rf'("{code}"[^}}]*am_peak:\s*\{{[^}}]*entering:\s*)[\d]+([^}}]*exiting:\s*)[\d]+([^}}]*\}})'
            new_db = re.sub(am_enter_pattern,
                rf'\g<1>{am["entering"]}\g<2>{am["exiting"]}\g<3>', db_content, count=1)
            if new_db != db_content:
                db_content = new_db
            else:
                # Try alternate pattern without sample_size between
                am_enter_pattern2 = rf'("{code}"[\s\S]*?am_peak:\s*\{{[\s\S]*?entering:\s*)(\d+)([\s\S]*?exiting:\s*)(\d+)'
                match = re.search(am_enter_pattern2, db_content)
                if match:
                    old_entering = int(match.group(2))
                    old_exiting = int(match.group(4))
                    if abs(old_entering - am["entering"]) > 5 or abs(old_exiting - am["exiting"]) > 5:
                        updates_made.append(f'{code} AM: {old_entering}/{old_exiting} -> {am["entering"]}/{am["exiting"]}')

    # Update PM peak if it exists
    if ext_data.get('pm_peak'):
        pm = ext_data['pm_peak']

        # Find and update PM peak rate
        if pm.get('rate'):
            pm_rate_pattern = rf'("{code}"[^}}]*pm_peak:\s*\{{[^}}]*rate:\s*)[\d.]+([^}}]*\}})'
            db_content = re.sub(pm_rate_pattern,
                rf'\g<1>{pm["rate"]}\g<2>', db_content, count=1)

        # Find and update PM peak entering/exiting
        if pm.get('entering') and pm.get('exiting'):
            pm_enter_pattern = rf'("{code}"[\s\S]*?pm_peak:\s*\{{[\s\S]*?entering:\s*)(\d+)([\s\S]*?exiting:\s*)(\d+)'
            match = re.search(pm_enter_pattern, db_content)
            if match:
                old_entering = int(match.group(2))
                old_exiting = int(match.group(4))
                if abs(old_entering - pm["entering"]) > 5 or abs(old_exiting - pm["exiting"]) > 5:
                    updates_made.append(f'{code} PM: {old_entering}/{old_exiting} -> {pm["entering"]}/{pm["exiting"]}')

# Since regex replacement is complex for nested objects, let's use a different approach
# We'll read, parse, modify and rewrite the specific values

print(f"Found {len(updates_made)} significant directional split changes needed:")
for u in updates_made[:20]:
    print(f"  {u}")
if len(updates_made) > 20:
    print(f"  ... and {len(updates_made) - 20} more")

print("\nPlease run the Node.js update script for proper updates.")
