import RPi.GPIO as GPIO
import time
import datetime
import sys
import json
GPIO.setmode(GPIO.BOARD)
CLK = 11
DOUT = 13
DIN = 15
CS = 19
GPIO.setup(12, GPIO.OUT)
GPIO.setup(10, GPIO.OUT)
GPIO.setup(CLK, GPIO.OUT)
GPIO.setup(DOUT, GPIO.IN)
GPIO.setup(DIN, GPIO.OUT)
GPIO.setup(CS, GPIO.OUT)
fesz1 = 2
fesz2 = 3


def readadc(num, clk, dout, din, cs):
    if((num > 7) or (num < 0)):
        return -1
    GPIO.output(cs, 1)
    GPIO.output(clk, 0)
    GPIO.output(cs, 0)
    command = num
    command |= 0x18
    command <<= 3
    for i in range(5):
        if (command & 0x80):
            GPIO.output(din, 1)
        else:
            GPIO.output(din, 0)
        command <<= 1
        GPIO.output(clk, 1)
        GPIO.output(clk, 0)
    out = 0
    for i in range(12):
        GPIO.output(clk, 1)
        GPIO.output(clk, 0)
        out <<= 1
        out |= GPIO.input(dout)
    GPIO.output(cs, 1)
    out >>= 1
    return out


try:
    while True:
        value1 = readadc(fesz1, CLK, DOUT, DIN, CS)
        value2 = readadc(fesz2, CLK, DOUT, DIN, CS)
        dt = datetime.datetime.now()
        milliseconds = int(round(dt.timestamp() * 1000))

        data = {"timestamp": milliseconds,
                "devices": [{"deviceid": "lc92", "value": value1 / 30, "unit": "Volt"},
                            {"deviceid": "XX44", "value": value2 / 30, "unit": "Bar"}
                            # {"deviceid": "ks89", "value": randint(0, 100), "unit": "Nm"}
                            ]}

        sys.stdout.write(json.dumps(data, default=str))
        sys.stdout.flush()
        time.sleep(2)
except KeyboardInterrupt:
    GPIO.cleanup()
