<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">确认投保</p>
    </header>
    <div class="containt-insured" style="margin-top:53px">
      <van-collapse v-model="activeNames">
        <van-collapse-item class="group" title="人员信息" name="owner">
          <div
            slot="right-icon"
            class="right-text"
            v-text="activeNames.indexOf('owner') > -1 ? '收起' : '展开'"
          ></div>
          <!-- 车主--个人 -->
          <van-cell-group v-if="one.type== '1'" class="item">
            <van-field v-model="one.name" label="车主姓名" placeholder="请输入车主姓名" />
            <van-field
              v-model="dentify"
              readonly
              label="证件类型"
              right-icon="arrow-down"
              @click="checkPicker('车主的证件类型',dentifyList)"
            />
            <van-field v-model="one.identifyNo" label="身份证号" placeholder="请输入身份证号" />
            <div class="Zjdate">
              <div class="datetit">证件有效期</div>
              <van-field
                class="field"
                readonly
                right-icon="notes-o"
                v-model="one.cervalidDate"
                @click="times=true"
              ></van-field>
              <van-field
                class="field"
                readonly
                right-icon="notes-o"
                v-model="one.creendDate"
                @click="times=true"
              ></van-field>
            </div>

            <van-popup v-model="times" position="bottom">
              <van-datetime-picker
                @confirm="confirmDate"
                @cancel="times=false"
                v-model="currentDate"
                type="date"
              />
            </van-popup>
            <van-field v-model="one.mobile" label="手机号码" maxlength="11" placeholder="请输入手机号码" />

            <!-- <van-cell v-if="dizhi"   title="地址" @click="shows=true,dizhi=false"   v-model="" //> -->

            <Area :current-area="OneAddr,OneAddrCode" @checkedArea="checkedArea1" label="地址" />
            <van-field
              label
              type="textarea"
              v-model="one.addr"
              rows="1"
              autosize
              placeholder="请填写具体路名、门牌地址"
            />

            <van-field v-model="one.email" label="邮箱地址" maxlength="20" placeholder="请输入邮箱地址" />
            <van-field
              v-model="OneOccupation"
              readonly
              label="职业"
              right-icon="arrow-down"
              @click="checkPicker('OneOccupation',occupationList)"
            />
          </van-cell-group>
          <!-- 投保人---个人 -->
          <van-cell-group class="item">
            <div class="check-wrap">
              <van-field value="同车主" label="投保人" readonly />
              <van-switch v-model="insuredOwner" size="24px" />
             
            </div>

            <van-cell-group v-show="!insuredOwner" class="b1">
              <van-field v-model="two.name" label="车主姓名" placeholder="请输入车主姓名" />
              <van-field
                v-model="dentify"
                readonly
                label="证件类型"
                right-icon="arrow-down"
                @click="checkPicker('dentify',dentifyList)"
              />
              <van-field v-model="two.identifyNo" label="身份证号" placeholder="请输入身份证号" />

              <div class="Zjdate">
                <div class="datetit">证件有效期</div>
                <van-field
                  class="field"
                  readonly
                  right-icon="notes-o"
                  v-model="two.cervalidDate"
                  @click="times2=true"
                ></van-field>
                <van-field class="field" readonly right-icon="notes-o" v-model="two.creendDate"></van-field>
              </div>

              <van-popup v-model="times2" position="bottom">
                <van-datetime-picker
                  @confirm="confirmDate2"
                  @cancel="times2=false"
                  v-model="currentDate"
                  type="date"
                />
              </van-popup>

              <van-field v-model="two.mobile" label="手机号码" maxlength="11" placeholder="请输入手机号码" />
              <Area :current-area="TwoAddr,TwoAddrCode" @checkedArea="checkedArea(3)" label="地址" />

              <van-field
                label
                type="textarea"
                v-model="two.addr"
                rows="1"
                autosize
                placeholder="请填写具体路名、门牌地址"
              />
              <van-field v-model="two.email" label="邮箱地址" maxlength="20" placeholder="请输入邮箱地址" />
              <van-field
                v-model="TwoOccupation"
                readonly
                label="职业"
                right-icon="arrow-down"
                @click="checkPicker('TwoOccupation',occupationList)"
              />
            </van-cell-group>
          </van-cell-group>
          <!-- 被保人---个人 -->
          <van-cell-group class="item">
            <div class="check-wrap">
              <van-field value="同车主" label="被保险人" readonly />
              <van-switch v-model="assuredOwner" size="24px" />
              <div>
                <span class="every-btn">{{oneEvery2}}</span>
                <van-icon name="arrow-down" @click="checkPicker('oneEvery2',oneEveryList2)"></van-icon>
              </div>
            </div>
            <van-cell-group v-show="!assuredOwner">
              <van-field v-model="three.name" label="车主姓名" placeholder="请输入车主姓名" />
              <van-field
                v-model="dentify"
                readonly
                label="证件类型"
                right-icon="arrow-down"
                @click="checkPicker('dentify',dentifyList)"
              />
              <van-field v-model="three.identifyNo" label="身份证号" placeholder="请输入身份证号" />
              <div class="Zjdate">
                <div class="datetit">证件有效期</div>
                <van-field
                  class="field"
                  readonly
                  right-icon="notes-o"
                  v-model="three.cervalidDate"
                  @click="times3=true"
                ></van-field>
                <van-field class="field" readonly right-icon="notes-o" v-model="three.creendDate"></van-field>
              </div>
              <van-popup v-model="times3" position="bottom">
                <van-datetime-picker
                  @confirm="confirmDate3"
                  @cancel="times3=false"
                  v-model="currentDate"
                  type="date"
                />
              </van-popup>
              <van-field v-model="three.mobile" label="手机号码" maxlength="11" placeholder="请输入手机号码" />
              <Area
                :current-area="ThreeAddr,ThreeAddrCode"
                @checkedArea="checkedArea(5)"
                label="地址"
              />
              <van-field
                label
                type="textarea"
                v-model="three.addr"
                rows="1"
                autosize
                placeholder="请填写具体路名、门牌地址"
              />
              <van-field v-model="three.email" label="邮箱地址" maxlength="20" placeholder="请输入邮箱地址" />
              <van-field
                v-model="occupation"
                readonly
                label="职业"
                right-icon="arrow-down"
                @click="checkPicker('occupation',occupationList)"
              />
            </van-cell-group>
            <!-- 机构 -->
            <van-cell-group v-show="!assuredOwner && this.type=='2'" class="item">
              <van-field v-model="three.name" label="客户名称" placeholder="华农财产" />
              <van-field
                v-model="dentify"
                readonly
                label="证件类型"
                right-icon="arrow-down"
                @click="checkPicker('dentify',dentifyList)"
              />
              <!-- @click="checkPicker('dentify',owner.dentifyType)" -->
              <van-field v-model="three.identifyNo" label="证件号码" placeholder="请输入身份证号" />
              <van-field v-model="three.mobile" label="手机号码" maxlength="11" placeholder="请输入手机号码" />
              <Area
                :current-area="ThreeAddr,ThreeAddrCode"
                @checkedArea="checkedArea(5)"
                label="地址"
              />
              <van-field
                label
                type="textarea"
                v-model="three.addr"
                rows="1"
                autosize
                placeholder="请填写具体路名、门牌地址"
              />
              <van-field v-model="three.email" label="邮箱地址" maxlength="20" placeholder="请输入邮箱地址" />

              <van-field v-model="three.chargeName" label="经办人姓名" placeholder="请输入" />
              <van-field
                v-model="chargeNationality"
                readonly
                label="经办人国籍"
                right-icon="arrow-down"
                @click="checkPicker('chargeNationality',chargeNationalityList)"
              />
              <van-field
                v-model="occupation"
                readonly
                label="职业"
                right-icon="arrow-down"
                @click="checkPicker('occupation',occupationList)"
              />
              <van-field
                v-model="dentify"
                readonly
                label="经办人证件类型"
                right-icon="arrow-down"
                @click="checkPicker('dentify',dentifyList)"
              />
              <van-field v-model="three.chargeIdentifyNo" label="经办人证件号码" placeholder="请输入身份证号" />
              <!-- <van-field v-model="three.chargeIdentifyDate" label="经办人证件有效期" placeholder="请输入身份证号" />
              <van-field v-model="three.corpIdentifyStartDate" label="营业执照证件有效期" placeholder="请输入" />-->

              <div class="Zjdate">
                <div class="datetit">经办人证件有效期</div>
                <van-field
                  class="field"
                  readonly
                  right-icon="notes-o"
                  v-model="three.chargeIdentifyDate"
                  @click="times8=true"
                ></van-field>
                <van-field
                  class="field"
                  readonly
                  right-icon="notes-o"
                  v-model="three.chargeIdentifyEndDate"
                ></van-field>
              </div>

              <van-popup v-model="times8" position="bottom">
                <van-datetime-picker
                  @confirm="confirmDate8"
                  @cancel="times8=false"
                  v-model="currentDate"
                  type="date"
                />
              </van-popup>

              <div class="Zjdate">
                <div class="datetit">营业执照证件有效期</div>
                <van-field
                  class="field"
                  readonly
                  right-icon="notes-o"
                  v-model="three.corpIdentifyStartDate"
                  @click="times9=true"
                ></van-field>
                <van-field
                  class="field"
                  readonly
                  right-icon="notes-o"
                  v-model="three.corpIdentifyEndDate"
                ></van-field>
              </div>

              <van-popup v-model="times9" position="bottom">
                <van-datetime-picker
                  @confirm="confirmDate9"
                  @cancel="times9=false"
                  v-model="currentDate"
                  type="date"
                />
              </van-popup>
            </van-cell-group>
          </van-cell-group>
        </van-collapse-item>
        <van-collapse-item class="group" title="影像上传" name="upload">
          <div
            slot="right-icon"
            class="right-text"
            v-text="activeNames.indexOf('upload') > -1 ? '收起' : '展开'"
          ></div>
          <Screenage :imgs="imgs" @emitImgList="emitImgs"></Screenage>
        </van-collapse-item>
        <van-collapse-item class="group" title="保单获取方式" name="access">
          <div
            slot="right-icon"
            class="right-text"
            v-text="activeNames.indexOf('access') > -1 ? '收起' : '展开'"
          ></div>
          <van-cell-group class="item">
            <van-field
              v-model="insurancePolicy"
              label="保单形式"
              readonly
              @click="checkPicker('insurancePolicy', insurancePolicyList)"
              right-icon="arrow-down"
            />
            <van-field
              v-if="insurancePolicy == '纸质'"
              v-model="distribution"
              readonly
              label="配送方式"
              @click="checkPicker('distribution', distributionList)"
              right-icon="arrow-down"
            />
            <van-field
              v-if="insurancePolicy == '电子'"
              v-model="mailAddr.email"
              label="邮箱地址"
              placeholder="请输入邮箱地址"
            />
            <van-cell-group v-if="insurancePolicy == '纸质' && distribution == '邮寄'">
              <van-field v-model="mailAddr.name" label="收件人" placeholder="请输入收件人" />
              <van-field v-model="mailAddr.mobile" label="手机号" placeholder="请输入手机号" />
              <Area :current-area="mail" @checkedArea="checkedArea7" />
              <van-field
                label
                type="textarea"
                v-model="mailAddr.addr"
                rows="1"
                autosize
                placeholder="请填写具体路名、门牌地址"
              />
            </van-cell-group>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
      <div class="btn-group">
        <span class="confirm" @click="confirmInsure">确认投保</span>
      </div>
      <!-- 选择框统一 -->
      <van-popup position="bottom" v-model="showPopup">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPopup = false"
          @confirm="confirmPopup"
        />
      </van-popup>
      <van-popup v-model="passShow" class="people">
        <div>
          <van-icon name="cross" class="icon" @click="peopleClose" />
          <p class="info">提示</p>
          <p class="content">亲，此单自动核保不通过。您可至“我的订单-待处理”进行下一步操作</p>
          <div class="btn">
            <van-button type="default" @click="lookOrder">查看我的订单</van-button>
            <van-button type="default" @click="otherCar">投保其他车辆</van-button>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="peopleShow" class="people">
        <div>
          <van-icon name="cross" class="icon" @click="peopleClose" />
          <p class="info">提示</p>
          <p class="content">亲，此单需要人工核保，请耐心等待5-10分钟。您可至“我的订单-待处理”进行下一步操作</p>
          <div class="btn">
            <van-button type="default" @click="lookOrder">查看我的订单</van-button>
            <van-button type="default" @click="otherCar">投保其他车辆</van-button>
          </div>
        </div>
      </van-popup>
      <!-- <van-popup v-model="show" class="showPopupPrice">
      <p>返回报价</p>
      <van-button plain color="#95c4fe" @click="cannelPrice">取消</van-button>
      <van-button type="info" @click="confirmSaleDiscount">确定</van-button>
      </van-popup>-->
    </div>
  </div>
</template>

<script>
import Area from "./module/area";

import aaaa from "@/common/library/area";
import Screenage from "./module/screenage";
import { confirmInsured, priceToConfirm, apply } from "@/common/library/api";
import dayjs from "dayjs";

export default {
  components: {
    Area,
    Screenage
  },
  data() {
    return {
      passShow: false,
      peopleShow: false,
      one: [],
      two: [],
      three: [],
      mailAddr: [],
      customerVoList: [],
      show: false,
      currentDate: "",
      currentDateName: "",
      times: false,
      times2: false,
      times3: false,
      times4: false,
      times5: false,
      times6: false,
      times7: false,
      times8: false,
      times9: false,
      columns: "",
      // 订单号:''
      orderNo: "",
      activeNames: ["owner", "upload", "access"],
      OneOccupation: "工人",
      occupation: "",
      TwoOccupation: "工人",
      occupationList: [
        { code: "000101", text: "公务员．职员" },
        { code: "0402005", text: "工人" },
        { code: "1201002", text: "教师" },
        { code: "2103", text: "个体经营员" },
        { code: "210302", text: "无固定职业人员" },
        { code: "2105", text: "现役军人" },
        { code: "31", text: "学生" },
        { code: "410001", text: "文员白领" },
        { code: "410002", text: "农民" },
        { code: "410003", text: "公共服务" },
        { code: "410004", text: "专业技术人员" },
        { code: "410005", text: "商业、服务业人员" },
        { code: "410006", text: "生产、运输人员" },
        { code: "410007", text: "其他从业人员" }
      ],
      // 车主
      dentify: "身份证",
      dentifyList: [
        { code: "01", text: "身份证" },
        { code: "03", text: "护照" },
        { code: "553", text: "外国人永久拘留身份证" },
        { code: "10", text: "组织机构证" },
        { code: "B", text: "统一信用证" }
      ],
      chargeNationality: "中国",
      chargeNationalityList: [
        { text: "阿富汗", code: "004" },
        { text: "阿尔巴尼亚", code: "008" },
        { text: "阿尔及利亚", code: "012" },
        { text: "美属萨摩亚", code: "016" },
        { text: "安道尔", code: "020" },
        { text: "安哥拉", code: "024" },
        { text: "安圭拉", code: "660" },
        { text: "南极洲", code: "010" },
        { text: "安提瓜和巴布达", code: "028" },
        { text: "阿根廷", code: "032" },
        { text: "亚美尼亚", code: "051" },
        { text: "阿鲁巴", code: "533" },
        { text: "澳大利亚", code: "036" },
        { text: "奥地利", code: "040" },
        { text: "阿塞拜疆", code: "031" },
        { text: "巴哈马", code: "044" },
        { text: "巴林", code: "048" },
        { text: "孟加拉国", code: "050" },
        { text: "巴巴多斯", code: "052" },
        { text: "白俄罗斯", code: "112" },
        { text: "比利时", code: "056" },
        { text: "伯利兹", code: "084" },
        { text: "贝宁", code: "204" },
        { text: "百慕大", code: "060" },
        { text: "不丹", code: "064" },
        { text: "玻利维亚", code: "068" },
        { text: "波黑", code: "070" },
        { text: "博茨瓦纳", code: "072" },
        { text: "布维岛", code: "074" },
        { text: "巴西", code: "076" },
        { text: "英属印度洋领土", code: "086" },
        { text: "文莱", code: "096" },
        { text: "保加利亚", code: "100" },
        { text: "布基纳法索", code: "854" },
        { text: "布隆迪", code: "108" },
        { text: "柬埔寨", code: "116" },
        { text: "喀麦隆", code: "120" },
        { text: "加拿大", code: "124" },
        { text: "佛得角", code: "132" },
        { text: "开曼群岛", code: "136" },
        { text: "中非", code: "140" },
        { text: "乍得", code: "148" },
        { text: "智利", code: "152" },
        { text: "中国", code: "156" },
        { text: "香港", code: "344" },
        { text: "澳门", code: "446" },
        { text: "台湾", code: "158" },
        { text: "圣诞岛", code: "162" },
        { text: "科科斯(基林)群岛", code: "166" },
        { text: "哥伦比亚", code: "170" },
        { text: "科摩罗", code: "174" },
        { text: "刚果（布）", code: "178" },
        { text: "刚果（金）", code: "180" },
        { text: "库克群岛", code: "184" },
        { text: "哥斯达黎加", code: "188" },
        { text: "科特迪瓦", code: "384" },
        { text: "克罗地亚", code: "191" },
        { text: "古巴", code: "192" },
        { text: "塞浦路斯", code: "196" },
        { text: "捷克", code: "203" },
        { text: "丹麦", code: "208" },
        { text: "吉布提", code: "262" },
        { text: "多米尼克", code: "212" },
        { text: "多米尼加共和国", code: "214" },
        { text: "东帝汶", code: "626" },
        { text: "厄瓜多尔", code: "218" },
        { text: "埃及", code: "818" },
        { text: "萨尔瓦多", code: "222" },
        { text: "赤道几内亚", code: "226" },
        { text: "厄立特里亚", code: "232" },
        { text: "爱沙尼亚", code: "233" },
        { text: "埃塞俄比亚", code: "231" },
        { text: "福克兰群岛(马尔维纳斯)", code: "238" },
        { text: "法罗群岛", code: "234" },
        { text: "斐济", code: "242" },
        { text: "芬兰", code: "246" },
        { text: "法国", code: "250" },
        { text: "法属圭亚那", code: "254" },
        { text: "法属波利尼西亚", code: "258" },
        { text: "法属南部领土", code: "260" },
        { text: "加蓬", code: "266" },
        { text: "冈比亚Gambia", code: "270" },
        { text: "格鲁吉亚", code: "268" },
        { text: "德国", code: "276" },
        { text: "加纳", code: "288" },
        { text: "直布罗陀", code: "292" },
        { text: "希腊", code: "300" },
        { text: "格陵兰", code: "304" },
        { text: "格林纳达", code: "308" },
        { text: "瓜德罗普", code: "312" },
        { text: "关岛", code: "316" },
        { text: "危地马拉", code: "320" },
        { text: "几内亚", code: "324" },
        { text: "几内亚比绍", code: "624" },
        { text: "圭亚那", code: "328" },
        { text: "海地", code: "332" },
        { text: "赫德岛和麦克唐纳岛", code: "334" },
        { text: "洪都拉斯", code: "340" },
        { text: "匈牙利", code: "348" },
        { text: "冰岛", code: "352" },
        { text: "印度", code: "356" },
        { text: "印度尼西亚", code: "360" },
        { text: "伊朗", code: "364" },
        { text: "伊拉克", code: "368" },
        { text: "爱尔兰", code: "372" },
        { text: "以色列", code: "376" },
        { text: "意大利", code: "380" },
        { text: "牙买加", code: "388" },
        { text: "日本", code: "392" },
        { text: "约旦", code: "400" },
        { text: "哈萨克斯坦", code: "398" },
        { text: "肯尼亚", code: "404" },
        { text: "基里巴斯", code: "296" },
        { text: "朝鲜", code: "408" },
        { text: "韩国", code: "410" },
        { text: "科威特", code: "414" },
        { text: "吉尔吉斯斯坦", code: "417" },
        { text: "老挝", code: "418" },
        { text: "拉脱维亚", code: "428" },
        { text: "黎巴嫩", code: "422" },
        { text: "莱索托", code: "426" },
        { text: "利比里亚", code: "430" },
        { text: "利比亚", code: "434" },
        { text: "列支敦士登", code: "438" },
        { text: "立陶宛", code: "440" },
        { text: "卢森堡", code: "442" },
        { text: "前南马其顿", code: "807" },
        { text: "马达加斯加", code: "450" },
        { text: "马拉维", code: "454" },
        { text: "马来西亚", code: "458" },
        { text: "马尔代夫", code: "462" },
        { text: "马里", code: "466" },
        { text: "马耳他", code: "470" },
        { text: "马绍尔群岛", code: "584" },
        { text: "马提尼克", code: "474" },
        { text: "毛里塔尼亚", code: "478" },
        { text: "毛里求斯", code: "480" },
        { text: "马约特", code: "175" },
        { text: "墨西哥", code: "484" },
        { text: "密克罗尼西亚联邦", code: "583" },
        { text: "摩尔多瓦", code: "498" },
        { text: "摩纳哥", code: "492" },
        { text: "蒙古", code: "496" },
        { text: "蒙特塞拉特", code: "500" },
        { text: "摩洛哥", code: "504" },
        { text: "莫桑比克", code: "508" },
        { text: "缅甸", code: "104" },
        { text: "纳米比亚", code: "516" },
        { text: "瑙鲁", code: "520" },
        { text: "尼泊尔", code: "524" },
        { text: "荷兰", code: "528" },
        { text: "荷属安的列斯", code: "530" },
        { text: "新喀里多尼亚", code: "540" },
        { text: "新西兰", code: "554" },
        { text: "尼加拉瓜", code: "558" },
        { text: "尼日尔", code: "562" },
        { text: "尼日利亚", code: "566" },
        { text: "纽埃", code: "570" },
        { text: "诺福克岛", code: "574" },
        { text: "北马里亚纳", code: "580" },
        { text: "挪威", code: "578" },
        { text: "阿曼", code: "512" },
        { text: "巴基斯坦", code: "586" },
        { text: "帕劳", code: "585" },
        { text: "巴勒斯坦", code: "374" },
        { text: "巴拿马", code: "591" },
        { text: "巴布亚新几内亚", code: "598" },
        { text: "巴拉圭", code: "600" },
        { text: "秘鲁", code: "604" },
        { text: "菲律宾", code: "608" },
        { text: "皮特凯恩群岛", code: "612" },
        { text: "波兰", code: "616" },
        { text: "葡萄牙", code: "620" },
        { text: "波多黎各", code: "630" },
        { text: "卡塔尔", code: "634" },
        { text: "留尼汪", code: "638" },
        { text: "罗马尼亚", code: "642" },
        { text: "俄罗斯联邦", code: "643" },
        { text: "卢旺达", code: "646" },
        { text: "圣赫勒拿", code: "654" },
        { text: "圣基茨和尼维斯", code: "659" },
        { text: "圣卢西亚", code: "662" },
        { text: "圣皮埃尔和密克隆", code: "666" },
        { text: "圣文森特和格林纳丁斯", code: "670" },
        { text: "萨摩亚", code: "882" },
        { text: "圣马力诺", code: "674" },
        { text: "圣多美和普林西比", code: "678" },
        { text: "沙特阿拉伯", code: "682" },
        { text: "塞内加尔", code: "686" },
        { text: "塞舌尔", code: "690" },
        { text: "塞拉利昂", code: "694" },
        { text: "新加坡", code: "702" },
        { text: "斯洛伐克", code: "703" },
        { text: "斯洛文尼亚", code: "705" },
        { text: "所罗门群岛", code: "090" },
        { text: "索马里", code: "706" },
        { text: "南非", code: "710" },
        { text: "南乔治亚岛和南桑德韦奇岛", code: "239" },
        { text: "西班牙", code: "724" },
        { text: "斯里兰卡", code: "144" },
        { text: "苏丹", code: "736" },
        { text: "苏里南", code: "740" },
        { text: "斯瓦尔巴群岛", code: "744" },
        { text: "斯威士兰", code: "748" },
        { text: "瑞典", code: "752" },
        { text: "瑞士", code: "756" },
        { text: "叙利亚", code: "760" },
        { text: "塔吉克斯坦", code: "762" },
        { text: "坦桑尼亚", code: "834" },
        { text: "泰国", code: "764" },
        { text: "多哥", code: "768" },
        { text: "托克劳", code: "772" },
        { text: "汤加", code: "776" },
        { text: "特立尼达和多巴哥", code: "780" },
        { text: "突尼斯", code: "788" },
        { text: "土耳其", code: "792" },
        { text: "土库曼斯坦", code: "795" },
        { text: "特克斯科斯群岛", code: "796" },
        { text: "图瓦卢", code: "798" },
        { text: "乌干达", code: "800" },
        { text: "乌克兰", code: "804" },
        { text: "阿联酋", code: "784" },
        { text: "英国", code: "826" },
        { text: "美国", code: "840" },
        { text: "美国本土外小岛屿", code: "581" },
        { text: "乌拉圭", code: "858" },
        { text: "乌兹别克斯坦", code: "860" },
        { text: "瓦努阿图", code: "548" },
        { text: "梵蒂冈", code: "336" },
        { text: "委内瑞拉", code: "862" },
        { text: "越南", code: "704" },
        { text: "英属维尔京群岛", code: "092" },
        { text: "美属维尔京群岛", code: "850" },
        { text: "瓦利斯和富图纳", code: "876" },
        { text: "西撒哈拉", code: "732" },
        { text: "也门", code: "887" },
        { text: "南斯拉夫", code: "891" },
        { text: "赞比亚", code: "894" },
        { text: "津巴布韦", code: "716" },
        { text: "其他", code: "999" },
        { text: "法属圣马丁", code: "663" },
        { text: "荷属圣马丁", code: "534" },
        { text: "塞尔维亚", code: "688" },
        { text: "黑山", code: "499" },
        { text: "盖比群岛", code: "987" },
        { text: "土阿莫土群岛", code: "988" },
        { text: "社会群岛", code: "989" },
        { text: "梅利利亚", code: "990" },
        { text: "塞卜泰(休达)", code: "991" },
        { text: "加那利群岛", code: "992" },
        { text: "萨巴", code: "993" },
        { text: "博内尔", code: "994" },
        { text: "库腊索岛", code: "995" },
        { text: "塞尔维亚和黑山", code: "996" },
        { text: "诺曼底群岛", code: "997" },
        { text: "马恩岛", code: "998" },
        { text: "津巴布韦", code: "ZWE" },
        { text: "国籍不详", code: "ZZZ" }
      ],
      type: "",
      role: "",
      owner: {
        // 证件有效期
        cervalidDate: "2019-09-19",
        creendDate: "",
        cardDate: "",
        name: "",
        // 证件类型
        dentifyType: "01",
        identifyNo: "",
        mobile: "",
        addr: "",
        email: "",
        // 市code
        city: "",
        cityValue: "",
        // type: "1",
        // 省code
        province: "",
        provinceValue: "",
        // 区code
        district: "",
        districtValue: "",
        //职业
        // 职业code
        job: "",

        //营业执照有效期
        corpIdentifyStartDate: "",
        corpIdentifyEndDate: "",
        //经办人证件有效期
        chargeIdentifyDate: "",
        chargeIdentifyEndDate: "",
        //经办人证件号码
        chargeIdentifyNo: "",
        //经办人证件类型
        chargeIdentifyType: "身份证",
        //经办人姓名
        chargeName: "",
        // 经办人国籍
        countryCode: "156"
      },
      // 投保人
      insured: {
        // 证件有效期
        cervalidDate: "2019-09-19",
        creendDate: "",
        cardDate: "",
        name: "",
        // 证件类型
        dentifyType: "01",

        identifyNo: "",
        mobile: "",
        addr: "",
        email: "",
        // 市code
        city: "",
        cityValue: "",
        role: "3",
        // type: "1",
        // 省code
        province: "",
        provinceValue: "",
        // 区code
        district: "",
        districtValue: "",
        //职业
        // 职业code
        job: "",

        //营业执照有效期
        corpIdentifyStartDate: "",
        corpIdentifyEndDate: "",
        //经办人证件有效期
        chargeIdentifyDate: "",
        chargeIdentifyEndDate: "",
        //经办人证件号码
        chargeIdentifyNo: "",
        //经办人证件类型
        chargeIdentifyType: "",
        //经办人姓名
        chargeName: "",
        // 经办人国籍
        countryCode: "156"
      },
      // 被保险人
      assured: {
        role: "1",
        name: "",
        dentifyType: "01",
        identifyNo: "",
        mobile: "",
        addr: "",
        email: "",
        // 市code
        city: "",
        cityValue: "",
        role: "3",
        // type: "1",

        // 省code
        province: "",
        provinceValue: "",
        // 区code
        district: "",
        districtValue: ""
      },
      // 影像上传
      imgs: {
        idFront: "",
        idReverse: "",
        vehicleLicenseFront: "",
        vehicleLicenseReverse: "",
        carImgs: [],
        otherImgs: []
      },
      //车主性质
      oneEvery: "个人",
      // oneEvery2: "个人",
      type: "1",
      oneEveryList: [{ code: 1, text: "个人" }, { code: 2, text: "机构" }],
      // oneEveryList2: [{ code: 1, text: "个人" }, { code: 2, text: "机构" }],
      insuredOwner: true,
      assuredOwner: true,
      showPopup: false,
      insurancePolicy: "电子",
      distribution: "网点自取",
      insurancePolicyList: [
        { code: 1, text: "电子" },
        { code: 2, text: "纸质" }
      ],
      distributionList: [
        { code: 1, text: "邮寄" },
        { code: 2, text: "网点自取" }
      ],
      columns: [],
      currentPop: "",
      email: "",
      city: "",
      cityCode: "",
      // mail: {
      //   // 配送方式
      //   expressType: "",
      //   //配送类型
      policyType: "",
      addressProps: [],
      OneAddr: "",
      OneAddrCode: "",
      TwoAddr: "",
      TwoAddrCode: "",
      ThreeAddr: "",
      ThreeAddrCode: "",
      mail: ""
    };
  },
  created() {},

  mounted() {
    this.confimHandle();
  },

  methods: {
    backHandle() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    // 投保其他车辆
    otherCar() {
      this.$router.push({ path: "/" });
    },
    //跳到订单列表
    lookOrder() {
      this.orderType = "2";
      this.$router.push({
        name: "orderList",
        params: {
          orderType: this.orderType
        }
      });
    },
    // 确定选择
    // 车主日期
    confirmDate(picker) {
      if (this.one.role == "3") {
        let date1 = dayjs(picker).format("YYYY-MM-DD");
        // 车主
        this.one.cervalidDate = date1;
        console.log(date1, "1111111111");
        let dayy1 = new Date(this.one.cervalidDate); //日期
        dayy1.setFullYear(dayy1.getFullYear() + 20);
        let oneDate = dayjs(dayy1).format("YYYY-MM-DD");
        this.one.creendDate = oneDate;
      }
      this.times = false;
    },
    //  客户 经办人日期
    confirmDate4(picker) {
      if (this.one.role == "3") {
        let date4 = dayjs(picker).format("YYYY-MM-DD");
        this.one.chargeIdentifyDate = date4;
        let dayy4 = new Date(this.one.chargeIdentifyDate);
        dayy4.setFullYear(dayy4.getFullYear() + 20);
        let fourDate = dayjs(dayy4).format("YYYY-MM-DD");
        this.one.chargeIdentifyEndDate = fourDate;
      }
      this.times4 = false;
    },
    // 客户 营业执照日期
    confirmDate5(picker) {
      if (this.one.role == "3") {
        let date5 = dayjs(picker).format("YYYY-MM-DD");
        this.one.corpIdentifyStartDate = date5;
        let dayy5 = new Date(this.one.corpIdentifyStartDate);
        dayy5.setFullYear(dayy5.getFullYear() + 20);
        let fiveDate = dayjs(dayy5).format("YYYY-MM-DD");
        this.one.corpIdentifyEndDate = fiveDate;
      }
      this.times5 = false;
    },
    //    投保人日期
    confirmDate2(picker) {
      if (this.two.role == "1") {
        let date2 = dayjs(picker).format("YYYY-MM-DD");
        // 投保人
        this.two.cervalidDate = date2;
        let dayy2 = new Date(this.two.cervalidDate); //日期
        dayy2.setFullYear(dayy2.getFullYear() + 20);
        let twoDate = dayjs(dayy2).format("YYYY-MM-DD");
        this.two.creendDate = twoDate;
      }
      this.times2 = false;
    },

    // 投保人 机构 经办人证件日期

    confirmDate6(picker) {
      if (this.two.role == "1") {
        let date6 = dayjs(picker).format("YYYY-MM-DD");
        // 投保人
        this.two.chargeIdentifyDate = date6;
        let dayy6 = new Date(this.two.chargeIdentifyDate); //日期
        dayy6.setFullYear(dayy6.getFullYear() + 20);
        let sixDate = dayjs(dayy6).format("YYYY-MM-DD");
        this.two.chargeIdentifyEndDate = sixDate;
      }
      this.times6 = false;
    },

    //    投保人  机构营业执照日期
    confirmDate7(picker) {
      if (this.two.role == "1") {
        let date7 = dayjs(picker).format("YYYY-MM-DD");
        // 投保人
        this.two.corpIdentifyStartDate = date7;
        let dayy7 = new Date(this.two.corpIdentifyStartDate); //日期
        dayy7.setFullYear(dayy7.getFullYear() + 20);
        let sevDate = dayjs(dayy7).format("YYYY-MM-DD");
        this.two.corpIdentifyEndDate = sevDate;
      }
      this.times7 = false;
    },
    //  被保人日期
    confirmDate3(picker) {
      if (this.three.role == "2") {
        let date3 = dayjs(picker).format("YYYY-MM-DD");
        this.three.cervalidDate = date3;
        let dayy3 = new Date(this.three.cervalidDate);
        dayy3.setFullYear(dayy3.getFullYear() + 20);
        let threeDate = dayjs(dayy3).format("YYYY-MM-DD");
        this.three.creendDate = threeDate;
      }
      this.times3 = false;
    },

    // 被保人 经办人证件日期
    confirmDate8(picker) {
      if (this.three.role == "2") {
        let date8 = dayjs(picker).format("YYYY-MM-DD");
        // 投保人
        this.three.chargeIdentifyDate = date8;
        let dayy8 = new Date(this.three.chargeIdentifyDate); //日期
        dayy8.setFullYear(dayy8.getFullYear() + 20);
        let eigDate = dayjs(dayy8).format("YYYY-MM-DD");
        this.three.chargeIdentifyEndDate = eigDate;
      }
      this.times8 = false;
    },

    //    被保人  机构营业执照日期
    confirmDate9(picker) {
      if (this.three.role == "2") {
        let date9 = dayjs(picker).format("YYYY-MM-DD");
        // 投保人
        this.three.corpIdentifyStartDate = date9;
        let dayy9 = new Date(this.three.corpIdentifyStartDate); //日期
        dayy9.setFullYear(dayy9.getFullYear() + 20);
        let nineDate = dayjs(dayy9).format("YYYY-MM-DD");
        this.three.corpIdentifyEndDate = nineDate;
      }
      this.times9 = false;
    },

    // showPopupDate(name){
    //     this.times=true
    // },
    // 确认报价
    async confimHandle() {
      var orderNo = this.$route.query.orderNo;
      const data = await priceToConfirm(orderNo);
      if (data.state === "200") {
        let ownerCar = data.data.customerVoList[0]; //车主
        let PolicyHolder = data.data.customerVoList[1]; //投保人
        let InsuredPerson = data.data.customerVoList[2]; //被保人
        let expressInfo = data.data.expressInfo;
        this.mailAddr = expressInfo;

        console.log(this.mailAddr);
        this.mail = `${expressInfo.provinceValue} ${expressInfo.cityValue} ${expressInfo.districtValue}`;

        if (ownerCar.role == "3") {
          // console.log(111111111111111);
          //车主
          this.OneAddr = `${ownerCar.provinceValue} ${ownerCar.cityValue} ${ownerCar.districtValue}`;
          this.OneAddrCode = `${ownerCar.province} ${ownerCar.city} ${ownerCar.district}`;
          this.one = ownerCar;
          console.log(this.one.type);
        }
        if (PolicyHolder.role == "1") {
          //投保人
          this.TwoAddr = `${PolicyHolder.provinceValue} ${PolicyHolder.cityValue} ${PolicyHolder.districtValue}`;
          this.TwoAddrCode = `${PolicyHolder.province} ${PolicyHolder.city} ${PolicyHolder.district}`;
          this.two = PolicyHolder;
        }
        if (InsuredPerson.role == "2") {
          this.ThreeAddr = `${InsuredPerson.provinceValue} ${InsuredPerson.cityValue} ${InsuredPerson.districtValue}`;
          this.ThreeAddrCode = `${InsuredPerson.province} ${InsuredPerson.city} ${InsuredPerson.district}`;
          this.three = InsuredPerson;
        }
      }
    },
    // 调用核保接口
    async confirmInsure() {
      if (this.insuredOwner == true) {
        this.two = Object.assign({}, this.one);
        this.two.role = "1";
      }
      if (this.assuredOwner == true) {
        // this.three = this.one;
        this.three = Object.assign({}, this.one);
        this.three.role = "2";
      }
      var obj = [];
      (obj[0] = this.one), (obj[1] = this.two), (obj[2] = this.three);
      this.mailAddr = this.mailAddr;
      var orderNo = this.$route.query.orderNo;
      const data = await confirmInsured({
        customerVoList: obj,
        orderNo: orderNo,
        expressInfo: this.mailAddr
      });
      if (data.state === "200") {
        var statusChild = data.data.status;
        if (data.data.status === "4" || data.data.status === "10") {
          this.passShow = true;
          this.orderType = "2";
          // this.$router.push({
          //   name: "orderList",
          //   params: {
          //     orderType: this.orderType
          //   }
          // });
          // alert("下发修改");
        } else if (data.data.status == "3") {
          this.peopleShow = true;
          this.orderType = "1";

          // alert("人工核保");
        } else if (data.data.status == "5") {
          // alert("待支付");
          this.pay();
        }
      } else if (data.state === "1") {
        // this.$toast(data.message);
        this.$router.push({ path: "/price" });
      } else {
        // this.$toast(data.message);
      }
    },
    checkPicker(current, list) {
      console.log(current, list);
      console.log(current);
      this.currentPop = current;
      this.columns = list;
      console.log(this.columns);
      this.showPopup = true;
    },
    async pay() {
      var orderNo = this.$route.query.orderNo;
      const data = await apply(orderNo);
      console.log(orderNo);
      if (data.state === "200") {
        var imgUrl = data.data;
        console.log(imgUrl);
        // window.localStorage.setItem(imgUrl,'data.data')
        this.$router.push({
          name: "payment",
          params: {
            imgUrl: imgUrl
          }
        });
      }
    },
    // 自动核保不通过按钮
    peopleClose() {
      this.peopleShow = false;
      this.$router.push({
        name: "orderList",
        params: {
          orderType: this.beneficiary
        }
      });
    },
    // 确定选择
    confirmPopup(picker, values) {
      console.log(picker, values);
      this.showPopup = false;
      if (picker.text) {
        this[this.currentPop] = picker.text;
      } else {
        this[this.currentPop] = picker;
        console.log(picker);
      }
      //职业
      for (var i = 0; i < this.occupationList.length; i++) {
        if (this.occupationList[i].text === picker.text) {
          if (this.one.role == "3") {
            console.log();
            this.OneOccupation = this.occupationList[i].text;
            this.one.job = this.occupationList[i].code;
          }
          if (this.two.role == "1") {
            this.TwoOccupation = this.occupationList[i].text;
            this.two.job = this.occupationList[i].code;
          }
        }
      }
      //证件类型
      for (var i = 0; i < this.dentifyList.length; i++) {
        if (this.dentifyList[i].text === picker.text) {
          this.dentify = this.dentifyList[i].text;
          this.owner.dentifyType = this.dentifyList[i].code;
          console.log(this.owner.dentifyType);
        }
      }
      //国籍
      for (var i = 0; i < this.chargeNationalityList.length; i++) {
        if (this.chargeNationalityList[i].text === picker.text) {
          this.chargeNationality = this.chargeNationalityList[i].text;
          this.owner.countryCode = this.chargeNationalityList[i].code;
          console.log(this.owner.countryCode);
        }
      }

      //车主性质
      for (var i = 0; i < this.oneEveryList.length; i++) {
        if (this.oneEveryList[i].text === picker.text) {
          this.oneEvery = this.oneEveryList[i].text;
          this.oneEvery2 = this.oneEveryList2[i].text;
          this.type = this.oneEveryList[i].code;

          console.log(this.type);
          if (this.type == "1") {
            aaaa.displ();
          } else {
            aaaa.displ2();
          }
        }
      }
      for (var i = 0; i < this.insurancePolicyList.length; i++) {
        if (this.insurancePolicyList[i].text === picker.text) {
          this.insurancePolicy = this.insurancePolicyList[i].text;
          this.mailAddr.policyType = this.insurancePolicyList[i].code;
        }
      }
      for (var i = 0; i < this.distributionList.length; i++) {
        if (this.distributionList[i].text === picker.text) {
          this.distribution = this.distributionList[i].text;
          this.mailAddr.expressType = this.distributionList[i].code;
        }
      }
    },
    checkedArea7(code, city) {
      console.log(code, city, "_----------------------------城市");
      this.city = city;
      this.cityCode = code;
      var bb = this.city.split(" ");
      var aa = this.cityCode.split(" ");
      this.mailAddr.province = aa[0];
      this.mailAddr.city = aa[1];
      this.mailAddr.district = aa[2];
      this.mailAddr.provinceValue = bb[0];
      this.mailAddr.cityValue = bb[1];
      this.mailAddr.districtValue = bb[2];
    },
    checkedArea1(code, city) {
      console.log(code, city, "_----------------------------城市");
      this.city = city;
      this.cityCode = code;
      var bb = this.city.split(" ");
      var aa = this.cityCode.split(" ");
      this.one.province = aa[0];
      this.one.city = aa[1];
      this.one.district = aa[2];
      this.one.provinceValue = bb[0];
      this.one.cityValue = bb[1];
      this.one.districtValue = bb[2];
    },
    checkedArea3(code, city) {
      console.log(code, city, "_----------------------------城市");
      this.city = city;
      this.cityCode = code;
      var bb = this.city.split(" ");
      var aa = this.cityCode.split(" ");
      this.two.province = aa[0];
      this.two.city = aa[1];
      this.two.district = aa[2];
      this.two.provinceValue = bb[0];
      this.two.cityValue = bb[1];
      this.two.districtValue = bb[2];
    },
    checkedArea5(code, city) {
      console.log(code, city, "_----------------------------城市");
      this.city = city;
      this.cityCode = code;
      var bb = this.city.split(" ");
      var aa = this.cityCode.split(" ");
      this.three.province = aa[0];
      this.three.city = aa[1];
      this.three.district = aa[2];
      this.three.provinceValue = bb[0];
      this.three.cityValue = bb[1];
      this.three.districtValue = bb[2];
    },
    emitImgs(list) {
      this.imgs = list;
    }
  }
};
</script>
<style lang="scss">
@import "/style/head.scss";
.people {
  width: 90%;
  padding: 20px 20px 30px;
  box-sizing: border-box;
  border-radius: 10px;
  .icon {
    float: right;
    font-size: 22px;
  }
  .info {
    text-align: center;
    height: 31px;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(70, 70, 70, 1);
    line-height: 31px;
    margin-bottom: 15px;
  }
  .content {
    width: 100%;
    height: 72px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(70, 70, 70, 1);
    line-height: 24px;
    margin-bottom: 17px;
  }
  .btn {
    display: flex;
    justify-content: space-around;
  }
}
.containt-insured {
  .group {
    margin-bottom: 15px;
    .van-collapse-item__title {
      .van-cell__title {
        font-size: 18px;
        line-height: 28px;
        color: #4a4a4a;
      }
    }
    .van-collapse-item__content {
      padding: 0;
    }
    .right-text {
      color: #568efc;
    }
    .item {
      .van-field__label {
        flex: 105px 0;
      }
      border-bottom: 8px solid #f0f2f4;
      &:last-child {
        border: none;
      }
      .check-wrap {
        display: flex;
        align-items: center;
        padding-right: 16px;
        position: relative;
        .van-field__control {
          text-align: right;
        }
        .every-btn {
          flex: 1;
          top: 35%;
          position: absolute;
          left: 33%;
        }
        .van-icon {
          position: absolute;
          top: 40%;
          left: 42%;
        }
      }
    }
  }
  .btn-group {
    background: #fff;
    padding: 20px;
    .confirm {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border-radius: 5px;
      height: 45px;
      font-size: 17px;
      color: #fff;
      background: #568efc;
    }
  }
  .Zjdate {
    width: 100%;
    display: flex;

    .datetit {
      width: 105px;
      line-height: 34px;
      text-align: center;
      color: #323233;
      font-size: 14px;
    }
    .field {
      flex: 1;
    }
  }
}
</style>
