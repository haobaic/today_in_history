import ajax from '../../utils/ajax.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    yueRi: '',
    arr: [
      { Month: '1月', data: "01" }, 
      { Month: '2月', data: "02" } ,
      { Month: '3月', data: "03" } , 
      { Month: '4月', data: "04" }, 
      { Month: '5月', data: "05" }, 
      { Month: '6月', data: "06" }, 
      { Month: '7月', data: "07" }, 
      { Month: '8月', data: "08" }, 
      { Month: '9月', data: "09" }, 
      { Month: '10月', data:"10" }, 
      { Month: '11月', data: "11" }, 
      { Month: '12月', data: "12" }],
    setA:[],
    brr: [],
    month:-1,
    days:-1,
    crr:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fnData()
    var brr=[]
    for (var i = 1; i < 32; i++) {
      if (i<10){
        i = '0' +i
      }else{
        i=''+i
      }
     brr.push(i)
    }
    var setA=[]
    for (var i =0; i < this.data.arr.length; i++) {
      setA.push(this.data.arr[i].Month)
    }
    this.setData({
      brr: brr,
      setA: setA
    })
  },
  fnData(){
    let month = this.getMonth()
    let monthDay = this.getTime()
    let yueRi = this.getFullTime()
    this.setList(month, monthDay, yueRi)
  },
  //列表请求
  async setList(month, monthDay, yueRi) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
   
    var res = await ajax(month);
    let that = this;
    wx.setNavigationBarTitle({
      title: yueRi
    })
    setTimeout(function () {
      wx.hideLoading();
      that.setData({
        dataList: res[month][monthDay],
        crr: res,
        yueRi,
        month: month
      })
    }, 2000)
   
  },
  //选择日子
  bindPickerChange: function (e) {
    var index = e.detail.value
    var day = this.data.month + this.data.brr[index];
    var yueRi = this.data.month + '月' + this.data.brr[index] + '日'
    wx.setNavigationBarTitle({
      title: yueRi
    })
    this.setData({
      dataList: this.data.crr[this.data.month][day],
      yueRi: yueRi,
      month: this.data.month,
      days: this.data.brr[index]
    })
  },
  //选择月份
  bindMonthChange: function (e) { 
    var index = e.detail.value;
    var month = this.data.arr[index].data;
    if (month == this.data.month) return false;
    var monthDay = this.data.arr[index].data + this.data.days
    var yueRi = month + '月' + this.data.days + '日'
    this.setList(month, monthDay, yueRi)
  },
  //跳转到详情页
  goDetail(event) {
    let link = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/pages/details/index?link=' + link,
    })
  },
  //获取月日
  getTime() {
    let date = new Date()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day = date.getDate()
    if (day < 10) {
      day = '0' + day
    }
    let monthDay = '' + month + day
    this.setData({
      days: day
    })
    return monthDay
  },
  //获取月份呢
  getMonth() {
    let date = new Date()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    return month
  },
  //获取标准的月日
  getFullTime() {
    let date = new Date()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day = date.getDate()
    if (day < 10) {
      day = '0' + day
    }
    let monthDay = month + '月' + day + '日'
    return monthDay
  }
})