/**
 * Tabs 样例
 * Created by liang on 2017/12/19.
 */

import React from 'react'
import { Tabs } from 'firebrand-component'
import { Icon } from 'antd'
const TabPane = Tabs.TabPane;
const TabsComp = () => {
  return (
    <Tabs defaultActiveKey="2">
      <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
        Tab 1
      </TabPane>
      <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
        Tab 2
      </TabPane>
    </Tabs>
  )
};
export default TabsComp;
