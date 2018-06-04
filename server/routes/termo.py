import sys
import json
import time
import datetime
from random import randint

while(True):

    dt = datetime.datetime.now()
    milliseconds = int(round(dt.timestamp() * 1000))

    data = {"timestamp": milliseconds,
            "devices": [{"deviceid": "lc92", "value": randint(-50, 100), "unit": "Volt"},
                        {"deviceid": "XX44", "value": randint(
                            0, 100), "unit": "Bar"},
                        {"deviceid": "ks89", "value": randint(0, 100), "unit": "Nm"}]}

    sys.stdout.write(json.dumps(data, default=str))
    sys.stdout.flush()
    time.sleep(2)
