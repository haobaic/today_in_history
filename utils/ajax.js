export function ajax(month) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://baike.baidu.com/cms/home/eventsOnHistory/${month}.json`,
      success(res) {
        resolve(res.data)
      },
      fail(res) {
        resolve(res)
      }
    })
  })
}