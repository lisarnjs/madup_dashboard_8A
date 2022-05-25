import { useState, useEffect, MouseEvent } from 'react'
import dayjs, { ManipulateType } from 'dayjs'
import { dateDifference } from 'services/allAdsStatus'
import StatusChart from './statusChart'
import styles, { cx } from 'styles'
import { ArrowDown } from 'assets/svgs'

import data from 'data/trend-data-set.json'
import AdItem from 'routes/Advertise/AdItem/AdItem'

const AllStatusChart = () => {
  const onClick = (num: number, str: ManipulateType | undefined = 'day') => {
    const { pastDate, toDay } = dateDifference(num, str)
    console.log(dayjs(pastDate).format('YYYY-MM-DD'))
    console.log(dayjs(toDay).format('YYYY-MM-DD'))
  }

  //  드롭다운 모듈화 시작----
  const options = ['Roas', '광고비', '노출수', '클릭수', '전환수', '매출 ']
  const [dropdown, setDropdown] = useState(false)
  const [selectItem, setSelectItem] = useState('Roas')

  const handleClickList = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectItem(e.currentTarget.name)
    setDropdown(false)
  }
  //  드롭다운 모듈화 끝----

  return (
    <div className={styles.chart}>
      {/* 드롭다운 모듈화 시작---- */}
      <div className={styles.dropdown}>
        <button type='button' onClick={() => setDropdown(!dropdown)}>
          <div className={styles.select}>
            <span>{selectItem}</span>
            <ArrowDown />
          </div>
        </button>
        <ul className={cx(styles.dropdownList, dropdown && styles.active)}>
          {options.map((item) => {
            return (
              <li key={item}>
                <button type='button' name={item} onClick={handleClickList}>
                  {item}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {/* 드롭다운 모듈화 끝---- */}

      <button type='button' onClick={() => onClick(7)}>
        일간
      </button>
      <button type='button' onClick={() => onClick(1, 'month')}>
        월간
      </button>
      <button type='button' onClick={() => onClick(2, 'month')}>
        주간
      </button>
      <div>
        <StatusChart />
      </div>
    </div>
  )
}

export default AllStatusChart
