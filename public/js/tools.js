const tools = {
  isEmpty(value) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  },
  utc2Beijing(utc_datetime) {
    // 将utc时间转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf("T");
    var Z_pos = utc_datetime.indexOf("Z");
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp + 8 * 60 * 60;

    // 时间戳转为时间
    var beijing_datetime = new Date(
      parseInt(timestamp) * 1000
    ).toLocaleString("chinese", { hour12: false });
    beijing_datetime = this.getDate("YYYY-MM-DD HH:MM:SS", beijing_datetime);
    return beijing_datetime; // 2017-03-31 16:02:06
  },
  getDate(format, str) {
    //转换时间
    var oDate = new Date(str),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSec = oDate.getSeconds();
    var oTime = "";
    if (format == "YYYY-MM-DD HH:MM:SS") {
      oTime =
        oYear +
        "-" +
        this.getzf(oMonth) +
        "-" +
        this.getzf(oDay) +
        " " +
        this.getzf(oHour) +
        ":" +
        this.getzf(oMin) +
        ":" +
        this.getzf(oSec); //最后拼接时间
    } else if (format == "yyyy/mm/dd") {
      oTime =
        oYear +
        "/" +
        this.getzf(oMonth) +
        "/" +
        this.getzf(oDay) +
        " " +
        this.getzf(oHour) +
        ":" +
        this.getzf(oMin) +
        ":" +
        this.getzf(oSec); //最后拼接时间
    }
    return oTime;
  },
  //补0操作
  getzf(num) {
    if (parseInt(num) < 10) {
      num = "0" + num;
    }
    return num;
  },
  getSomeDate(type, time) {
    var date = new Date();
    time = time || 0;
    //如果获取的时间不是当日、当月、当年，先将当前日期设置到需要得到的之前日期
    if (type == "day") {
      date.setDate(date.getDate() - time);
    } else if (type == "month") {
      date.setMonth(date.getMonth() - time);
    } else if (type == "year") {
      date.setFullYear(date.getFullYear() - time);
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    var yee;
    if (type == "month" && time == 0) {
      yee = year + "-" + month + "-01";
    } else if (type == "year" && time == 0) {
      yee = year + "-01-01";
    } else {
      yee = year + "-" + month + "-" + day;
    }
    return yee;
  }
};

export default tools;
