import sys
import json
import time


data = ["this began life in python", "hallo"]
while(True):
    sys.stdout.write(json.dumps(data))
    sys.stdout.flush()
    time.sleep(1)
