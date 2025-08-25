pid_websersocket=$(pgrep -f "websersocket_6d10f80a-7248-4e26-8de6-0513ce36a856.js")
watch -n 1 ps -p $pid_websersocket -o pid,etime,%cpu,%mem,cmd