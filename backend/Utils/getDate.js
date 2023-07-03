

const TimeAndDateFunc = () => {


    const TimeObject = {};

    let dateobj = new Date();
    let currentDate = dateobj.toString().substring(4, 15);
    let hours = dateobj.getHours()
    let minute = dateobj.getMinutes()
    let second = dateobj.getSeconds()
    let currentTime;

    if (hours > 12) {
        currentTime = (hours - 12) + ":" + minute + ":" + second + " PM"
    } else {
        currentTime = hours + ":" + minute + ":" + second + " AM"
    }


    let temp = currentTime;
    let arr = temp.split(":")

    if (arr[0].length == 1) {
        arr[0] = "0" + arr[0];

    }
    if (arr[1].length == 1) {
        arr[1] = "0" + arr[1];
    }

    let last = arr[2].split(" ")
    if (last[0] < 10 && last[0] >= 0) {
        last[0] = "0" + last[0];
    }
    let laststr = last[0] + " " + last[1];
    let arrstr = arr[0] + ":" + arr[1] + ":" + laststr


    TimeObject.currentDate = currentDate
    TimeObject.currentTime = arrstr;

    return TimeObject


}

module.exports = TimeAndDateFunc

