/**
 * 将查询后的列表数据集合根据替换规则替换为正确的字符
 * @param {查询结果集} result
 * @param {替换规则} replace
 */
export function initReplaceListData(result, replace) {
  // 数据格式化
  if (result) {
    if (replace) {
      for (const index in replace) {
        const r = replace[index]
        const prop = r.name
        const doReplace = r.replace
        for (const j in result) {
          const valueForResult = result[j][prop]
          for (const key in doReplace) {
            const value = doReplace[key]
            if (valueForResult == key) {
              result[j][prop] = value
            }
          }
        }
      }
    }
  }
  return result
}

/**
 * 更新数据时根据替换规则将数据替换为原本的结构
 * @param {更新数据} temp
 * @param {替换规则} replace
 */
export function initReplaceUpdateData(temp, replace, userid) {
  if (replace && temp) {
    for (const index in replace) {
      const repName = replace[index].name
      const repCont = replace[index].replace
      const tempVal = temp[repName]
      for (const key in repCont) {
        const repVal = repCont[key]
        if (repVal === tempVal) {
          temp[repName] = key
        }
      }
    }
  }

  if (temp) {
    temp.creator = null
    temp.modifier = userid
  }
}

/**
 * 处理后台逻辑后将数据添加到页面中
 * @param {新增数据} temp
 * @param {替换规则} replace
 */
export function initReplaceAddData(temp, replace, username) {
  if (replace && temp) {
    for (const index in replace) {
      const repName = replace[index].name
      const repCont = replace[index].replace
      const tempVal = temp[repName]
      for (const key in repCont) {
        const repVal = repCont[key]
        if (tempVal === key) {
          temp[repName] = repVal
        }
      }
    }
  }

  if (temp && !temp.creatorShow) {
    temp.creatorShow = username
  }
}

/**
 * 将数据库中多选空间存储的值转换为控件需要的值
 * @param { 多选空间存储值 } manySelected
 */
export function initElSelectManyShowData(manySelected) {
  const selectedArr = []
  if (manySelected && typeof (manySelected) === 'string') {
    const valSplit = manySelected.split(',')
    if (valSplit) {
      for (const index in valSplit) {
        selectedArr.push(Number.parseInt(valSplit[index]))
      }
      return selectedArr
    }
  }
  return selectedArr
}

/**
 * 将多选择器控件的值转换为后台中存储的数据格式
 * @param { 控件中带出来的值 } manySelected
 */
export function initElSelectManySaveData(manySelected) {
  let saveVal = ''
  if (manySelected) {
    for (const index in manySelected) {
      const valOne = manySelected[index]
      if (valOne) {
        saveVal = saveVal + valOne + ','
      }
    }
    saveVal = saveVal.substr(0, saveVal.length - 1)
  }
  return saveVal
}

/**
 * 格式化日期为字符串
 * @param {日期参数} time
 * @param {格式参数} cFormat
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 生成随机数
 * @param {盐值} number
 */
export function randomNum(number) {
  const today = new Date()
  const seed = today.getTime()
  return rand(number, seed)
}
function rand(number, seed) {
  return Math.ceil(rnd(seed) * number)
}
function rnd(seed) {
  seed = (seed * 9301 + 49297) % 233280
  return seed / (233280.0)
}

// 转换参照的key类型为int类型
export function parseRefKeyInt(refOption) {
  if (refOption) {
    for (const index in refOption) {
      if (refOption[index]) {
        refOption[index].value = Number.parseInt(refOption[index].value)
      }
    }
  }
  return refOption
}

// 根据屏幕分辩率计算比例PX尺寸
function dpr() {
  return window.devicePixelRatio || 1
}

function thinLineWidth() {
  return dpr() - 0.5
}

export function npx(px) {
  return parseInt(px * dpr(), 10)
}

// 比率计算
export function npxMate(mate) {
  console.log((mate / 100) * dwt())
  return parseInt((mate / 100) * dwt())
}

// document width
function dwt() {
  return window.screen.width
}

function npxLine(px) {
  const n = npx(px)
  return n > 0 ? n - 0.5 : 0
}

/*
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
* 返回精度为：秒，分，小时，天
*/

export function getDateDiff(startTime, endTime, diffType) {
  // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/-/g, '/')
  endTime = endTime.replace(/-/g, '/')

  // 将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase()
  var sTime = new Date(startTime) // 开始时间
  var eTime = new Date(endTime) // 结束时间
  // 作为除数的数字
  var divNum = 1
  switch (diffType) {
    case 'second':
      divNum = 1000
      break
    case 'minute':
      divNum = 1000 * 60
      break
    case 'hour':
      divNum = 1000 * 3600
      break
    case 'day':
      divNum = 1000 * 3600 * 24
      break
    default:
      break
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum))
}
