<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">确认报价</p>
    </header>
    <div class="price" style="margin-top:38px;">
      <div @change="changeHandle">
        <!-- 人工核保意见 -->
        <div class="art-Nuclear container" v-show="UWNotionShow">
          <van-cell title="人工核保意见" class="item">
            <van-button class="btn" v-show="!isShowArt" @click="isShowArt=true">展开</van-button>
            <van-button class="btn" v-show="isShowArt" @click="isShowArt=false">收起</van-button>
          </van-cell>
          <div v-show="isShowArt" class="pre-verification-txt">{{uWNotion}}</div>
        </div>
        <!-- 预核保意见 -->
        <div class="pre-verification container" v-show="verificationShow">
          <van-cell title="预核保意见" class="item">
            <van-button class="btn" v-show="!isShow" @click="isShow=true">展开</van-button>
            <van-button class="btn" v-show="isShow" @click="isShow=false">收起</van-button>
          </van-cell>
          <div v-show="isShow" class="pre-verification-txt">{{iLogPreUdwMess}}</div>
        </div>
        <!-- 车辆信息 -->
        <div class="car-msg container">
          <van-cell title="车辆信息" class="item">
            <van-button class="btn" v-show="!isShowCar" @click="isShowCar=true">展开</van-button>
            <van-button class="btn" v-show="isShowCar" @click="isShowCar=false">收起</van-button>
          </van-cell>
          <div class="car-msgInfo cells">
            <van-cell class="carNumber" title="车牌号码">
              <span>{{city}}</span>
              <van-icon name="arrow-down" @click="choosePopup(cityList,'city')"></van-icon>
              <input
                type="text"
                v-model="plateNo"
                placeholder="请输入车牌号"
                :disabled="noLicenseFlag==true"
                style="background:#fff"
              />
            </van-cell>
            <div v-show="isShowCar">
              <van-cell
                title="车辆类型"
                is-link
                v-model="car"
                arrow-direction="down"
                @click="choosePopup(carList,'car')"
              />
              <van-field
                v-model="VIN"
                label="车架号"
                maxlength="17"
                @change="changeHandle"
                @input="number(VIN)"
                @blur="tipC"
              ></van-field>

              <!-- <van-icon name="close" /> -->
              <van-field
                v-model="engine"
                label="发动机号"
                @change="changeHandle"
                @input="faNum(engine)"
                @blur="tipF"
              />
              <van-field
                label="初登日期"
                v-model="registerDate"
                right-icon="notes-o"
                @click="dateShow3('registerDate')"
                readonly
                @change="changeHandle"
              />
              <!-- <van-popup v-model="showPopupDate" position="bottom">
              <van-datetime-picker
                @confirm="confirmDate"
                @cancel="showPopupDate=false"
                v-model="currentDate"
                type="year-mounth"
              />
              </van-popup>-->
              <div style="display:flex;">
                <van-field
                  class="carPai"
                  v-model="model"
                  label="品牌型号"
                  disabled
                  @click="CarPaiHandle"
                  @changeHandle="changeHandle"
                />
                <van-icon style="position: absolute; right:17px;" size="16px" name="arrow-down" />
              </div>

              <!-- <van-popup v-model="showPopupDate" position="bottom">
              <van-datetime-picker
                @confirm="confirmDate"
                @cancel="showPopupDate=false"
                v-model="currentDate"
                type="datetime"
              />
              </van-popup>-->
            </div>
            <van-cell title="一年内过户">
              <van-switch-cell
                v-model="open"
                class="year"
                @change="changeHandle"
                @changeHandle="changeHandle"
              />
            </van-cell>
            <van-field
              v-show="open == true"
              placeholder="请选择发证日期"
              label="发证日期"
              v-model="issueDate"
              right-icon="notes-o"
              @click="dateShow2('issueDate')"
              readonly
              @changeHandle="changeHandle"
            />
            <van-cell title="贷款车" value>
              <van-switch-cell v-model="loanCar" class="year" @change="changeHandle" />
            </van-cell>
            <van-cell-group v-show="loanCar">
              <van-cell
                title="如需手动添加特约，请点击右侧按钮"
                is-link
                arrow-direction="down"
                id="loanCar"
                @click="loanCarButton"
                @changeHandle="changeHandle"
              />
              <van-cell title="特约1：">{{this.beneficiaryContent}}</van-cell>
            </van-cell-group>
            <van-popup v-model="loanCarPopup" position="bottom" closeable>
              <div class="contributing">
                <div class="top">
                  <span>特别约定</span>
                  <!-- <van-icon name="cross"></van-icon> -->
                </div>
                <div class="content">
                  <div class="title">
                    <van-checkbox v-model="checked2" @change="changeHandle">手工历史特约内容</van-checkbox>
                  </div>

                  <van-radio-group v-model="radio">
                    <van-radio
                      class="child"
                      :name="item"
                      checked-color="#568efc"
                      v-for="(item, index) in this.engageList"
                      :key="index"
                      @click="radioBtn"
                    >{{item.engageDetail}}</van-radio>
                  </van-radio-group>
                  <div class="title add">
                    <van-checkbox v-model="checked" style="padding-bottom:0">手工添加特约</van-checkbox>
                  </div>
                  <p id="AddloanCar" v-show="addShow" @click="addShowInput">添加一条特约</p>
                  <div class="child" v-show="!addShow">
                    <van-checkbox v-model="checked">
                      <input
                        type="text"
                        class="addBeneficiary"
                        placeholder="手工添加特约内容"
                        v-model="beneficiaryContent"
                      />
                    </van-checkbox>
                  </div>
                </div>
                <van-button type="info" @click="beneficiaryHandle">确定</van-button>
              </div>
            </van-popup>
          </div>
        </div>
        <!-- 车主信息 -->
        <div class="carMaster-msg container">
          <van-cell title="车主信息" class="item">
            <van-button class="btn" v-show="!isShowCarMaster" @click="isShowCarMaster=true">展开</van-button>
            <van-button class="btn" v-show="isShowCarMaster" @click="isShowCarMaster=false">收起</van-button>
          </van-cell>
          <div class="carMaster-msgInfo cells">
            <van-field v-model="carName" label="车主姓名" @blur="tipN" />
            <div v-show="isShowCarMaster">
              <van-cell
                title="证件类型"
                is-link
                v-model="card"
                arrow-direction="down"
                @click="choosePopup(cardList,'card')"
                @changeHandle="changeHandle"
              />
              <van-field
                v-model="identifyNo"
                label="身份证号"
                @changeHandle="changeHandle"
                @blur="tipCarno"
              />
            </div>
          </div>
        </div>
        <!-- 投保方案 -->
        <div class="insurance-scheme container">
          <van-cell title="投保方案" class="item">
            <van-button class="btn" v-show="!isShowScheme" @click="isShowScheme=true">展开</van-button>
            <van-button class="btn" v-show="isShowScheme" @click="isShowScheme=false">收起</van-button>
          </van-cell>
          <!-- 交强险 -->
          <div class="com-insurance">
            <div class="com-title">
              <div class="left">
                <van-checkbox v-model="checked" shape="squre" @change="changeHandle">交强险</van-checkbox>
              </div>
              <div class="right">
                <span>合计</span>
                <span class="money">￥{{ciSumPermium}}</span>
              </div>
            </div>
            <van-divider />
            <div class="insurance-msg cells">
              <van-field
                class="insurance-data"
                label="起保日期"
                v-model="insRegDate"
                right-icon="notes-o"
                @click-right-icon="dateShow('insRegDate')"
                readonly
                @changeHandle="changeHandle"
              >
                <van-button
                  class="button2"
                  slot="button"
                  size="small"
                  color="#888"
                  plain
                  :class="{'fx':islijiActive}"
                  @click="quick2"
                  @changeHandle="changeHandle"
                >即时起保</van-button>
              </van-field>
              <van-field
                label="终保日期"
                v-model="endDate"
                right-icon="notes-o"
                @click-right-icon="dateShow('endDate')"
                readonly
                @changeHandle="changeHandle"
              ></van-field>
              <!-- <van-popup v-model="showPopupDate" position="bottom">
              <van-datetime-picker
                @confirm="confirmDate"
                @cancel="showPopupDate=false"
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
        
              />
              </van-popup>-->
              <van-cell title="交强险">
                <span style="float:right;color:#4a4a4a">￥{{insuranceMoney}}</span>
              </van-cell>
              <div class="ship" v-show="checked">
                <van-cell title="车船税">
                  <span style="float:right;color:#4a4a4a">￥{{shipNum}}</span>
                </van-cell>
                <van-cell
                  title="缴税类型"
                  is-link
                  v-model="payTax"
                  arrow-direction="down"
                  @click="choosePopup(payTaxList,'payTax')"
                  @changeHandle="changeHandle"
                >
                  <span
                    slot="label"
                    v-show="payTax==='减税'||payTax==='正常缴税'"
                  >(含往年补缴{{sumTaxDefault}}元，滞纳金{{sumOverdue}}元)</span>
                </van-cell>
                <!-- 已完税 -->
                <van-cell-group v-if="payTax==='已完税'" @changeHandle="changeHandle">
                  <van-field
                    v-model="documentNumber"
                    label="完税凭证号码"
                    @changeHandle="changeHandle"
                    clearable
                  />
                  <van-field
                    v-model="taxDepartmentCode"
                    label="税务机关代码"
                    @changeHandle="changeHandle"
                  />
                  <van-field v-model="taxDepartment" label="税务机关名称" @changeHandle="changeHandle" />
                  <van-field
                    label="完税凭证填发日期"
                    v-model="taxDocumentDate"
                    right-icon="notes-o"
                    @click-right-icon="dateShow4('taxDocumentDate')"
                    readonly
                    @changeHandle="changeHandle"
                  ></van-field>
                  <van-cell
                    class="cityCode"
                    title="开具完税凭证地区代码"
                    is-link
                    v-model="taxLocation"
                    arrow-direction="down"
                    @click="choosePopup(taxLocationList,'taxLocation')"
                    @changeHandle="changeHandle"
                  />
                </van-cell-group>
                <!-- 免税 -->
                <van-cell-group v-if="payTax==='免税'">
                  <van-cell
                    class="cityNumber"
                    title="免税车型"
                    is-link
                    v-model="deductionDue"
                    arrow-direction="down"
                    @click="choosePopup(deductionDueList,'deductionDue')"
                    @changeHandle="changeHandle"
                  />

                  <van-cell
                    class="deductionDueType"
                    title="减免税方案代码"
                    is-link
                    v-model="deductionDueType"
                    arrow-direction="down"
                    @click="choosePopup(deductionDueTypeList,'deductionDueType')"
                    @changeHandle="changeHandle"
                  />
                  <van-field
                    v-model="deductionDueProportion"
                    label="减免比例"
                    @changeHandle="changeHandle"
                  />
                  <van-field v-model="documentNumber" label="减免税凭证号" @changeHandle="changeHandle"></van-field>
                  <van-field v-model="taxDepartment" label="税务机关名称" @changeHandle="changeHandle" />
                  <van-field
                    v-model="taxDepartmentCode"
                    label="税务机关代码"
                    @changeHandle="changeHandle"
                  />
                </van-cell-group>
                <!-- 减税 -->
                <van-cell-group v-if="payTax==='减税'">
                  <van-cell
                    class="cityNumber"
                    title="免税车型"
                    is-link
                    v-model="deductionDue"
                    arrow-direction="down"
                    @click="choosePopup(deductionDueList,'deductionDue')"
                    @changeHandle="changeHandle"
                  />
                  <van-cell
                    class="cityNumber"
                    title="减免税方案代码"
                    is-link
                    v-model="deductionDueType"
                    arrow-direction="down"
                    @click="choosePopup(deductionDueTypeList,'deductionDueType')"
                    @changeHandle="changeHandle"
                  />
                  <van-field
                    v-model="deductionDueProportion"
                    label="减免比例"
                    @changeHandle="changeHandle"
                  />
                  <van-field v-model="documentNumber" label="减免税凭证号" @changeHandle="changeHandle"></van-field>
                  <van-field v-model="taxDepartment" label="税务机关名称" @changeHandle="changeHandle" />
                </van-cell-group>
                <!-- 不征 -->
                <van-cell-group v-if="payTax==='不征'">
                  <van-field v-model="documentNumber" label="减免税凭证号" @changeHandle="changeHandle"></van-field>
                  <van-field v-model="taxDepartment" label="税务机关名称" @changeHandle="changeHandle" />
                </van-cell-group>
              </div>
            </div>
          </div>
          <!-- 商业险 -->
          <div class="buss-insurance cells">
            <div class="com-title">
              <div class="left">
                <van-checkbox
                  v-model="bussines"
                  shape="squre"
                  @change="changeHandle"
                  @click="businessBtn"
                >商业险</van-checkbox>
              </div>
              <div class="right">
                <span>合计</span>
                <span class="money">￥{{bussinesNum}}</span>
              </div>
            </div>
            <van-divider />
            <div class="bussines-msg">
              <van-field
                class="bussines-data"
                label="起保日期"
                v-model="busRegisterDate"
                right-icon="notes-o"
                @click-right-icon="dateShow('busRegisterDate')"
                readonly
                @changeHandle="changeHandle"
              >
                <van-button
                  slot="button"
                  size="small"
                  color="#888"
                  plain
                  @click="quick1"
                  @changeHandle="changeHandle"
                  :class="{'fxx':bussjiActive}"
                >即时起保</van-button>
              </van-field>
              <!-- <van-popup v-model="showPopupDate" position="bottom">
              <van-datetime-picker
                @confirm="confirmDate"
                @cancel="showPopupDate=false"
                v-model="currentDate"
                type="data"
                @change="changeHandle"
              />
              </van-popup>-->
              <van-field
                label="终保日期"
                v-model="RegDate"
                right-icon="notes-o"
                @click-right-icon="dateShow('RegDate')"
                readonly
                @changeHandle="changeHandle"
              ></van-field>
              <!-- <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
              @change="changeHandle"
            />
              </van-popup>-->
              <van-popup v-model="showPopupDate" position="bottom">
                <van-datetime-picker
                  @cancel="showPopupDate=false"
                  v-model="currentDate"
                  type="date"
                  @confirm="confirmDate"
                  @change="changeHandle"
                  :min-date="minDate"
                />
              </van-popup>
              <!-- 完税凭证填发日期 -->
              <van-popup v-model="showPopupDate5" position="bottom">
                <van-datetime-picker
                  @cancel="showPopupDate5=false"
                  v-model="currentDate"
                  type="date"
                  @confirm="confirmDate5"
                  @change="changeHandle"
                />
              </van-popup>
              <!-- 初登日期 -->
              <van-popup v-model="showPopupDate2" position="bottom">
                <van-datetime-picker
                  @cancel="showPopupDate2=false"
                  v-model="currentDate2"
                  type="date"
                  @confirm="confirmDate2"
                  @change="changeHandle"
                />
              </van-popup>
            </div>
            <van-divider />
            <div class="second">
              <span class="s2">{{this.typesList[0].text}}</span>
              <!-- <van-field class="s2" readonly label="{{this.typesList.text}}"></van-field> -->
              <van-checkbox
                v-model="carChecked"
                shape="squre"
                @change="changeHandle"
                @click="handleToast"
              >不计免赔</van-checkbox>
              <van-switch v-model="carSwitch" size="24px" @change="changeHandle" />
            </div>
            <van-divider />
            <div class="coverage">
              <span>保额</span>
              <input type="text" v-model="carAmount" />
              <span class="money">￥{{carPremium}}</span>
              <span
                style="float:left;color:red;font-size:12px"
              >(请输入的保额区间在{{minAmount}}-{{maxAmount }}之间)</span>
            </div>
            <van-divider />
            <div class="second insures">
              <span class="s2">{{this.typesList[1].text}}</span>
              <van-checkbox v-model="secondChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
              <div class="insures-right">
                <span>{{second}}</span>
                <van-icon name="arrow-down" @click="choosePopup(secondList,'second')"></van-icon>
                <span class="money">￥{{secondPremium}}</span>
              </div>
            </div>
            <van-divider />
            <div class="more" v-show="!moreShow" @click="moreShow =true">
              <van-button color="#568EFC" plain>添加更多商业险种</van-button>
            </div>
            <div class="moreInsure" v-show="moreShow">
              <div class="second insures">
                <span class="s2">{{this.typesList[2].text}}</span>
                <van-checkbox v-model="driverChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
                <div class="insures-right">
                  <span>{{driver}}</span>
                  <van-icon name="arrow-down" @click="choosePopup(driverList,'driver')"></van-icon>
                  <span class="money">￥{{driverPremium}}</span>
                </div>
              </div>
              <van-divider />
              <div class="second insures">
                <span class="s2">{{this.typesList[3].text}}</span>
                <van-checkbox v-model="fareChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
                <div class="insures-right">
                  <span>{{fare}}</span>
                  <van-icon name="arrow-down" @click="choosePopup(fareList,'fare')"></van-icon>
                  <span class="money">￥{{farePremium}}</span>
                </div>
              </div>
              <van-divider />
              <div class="second" :id="this.typesList[4].code">
                <span class="s2">{{this.typesList[4].text}}</span>
                <van-checkbox v-model="robbingChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
                <van-switch v-model="robbingSwitch" size="24px" @change="changeHandle" />
              </div>
              <van-divider />
              <div class="second">
                <span style="padding-top:12px">{{this.typesList[5].text}}</span>
                <van-switch v-model="damageSwitch" size="24px" @change="changeHandle" />
              </div>
              <van-divider />
              <div class="second">
                <span class="s2" style="margin-right:35px">{{this.typesList[6].text}}</span>
                <div class="import-btn">
                  <span>{{import1}}</span>
                  <van-icon name="arrow-down" @click="choosePopup(importList,'import1')"></van-icon>
                </div>
                <van-switch v-model="importSwitch" size="24px" @change="changeHandle" />
              </div>
              <van-divider />
              <div class="second">
                <span class="s2" style="margin-right:35px">{{this.typesList[7].text}}</span>
                <div class="import-btn">
                  <span>{{import1}}</span>
                  <van-icon name="arrow-down" @click="choosePopup(importList,'import1')"></van-icon>
                </div>
                <!-- 百分比 -->
                <div class="import-btn" v-show="isShow">
                  <span>{{percent}}</span>
                  <van-icon name="arrow-down" @click="choosePopup(importList1,'percent')"></van-icon>
                </div>
                <div class="import-btn" v-show="!isShow">
                  <span>{{percent1}}</span>
                  <van-icon name="arrow-down" @click="choosePopup(importList2,'percent1')"></van-icon>
                </div>
                <van-switch v-model="domesticSwitch" size="24px" @change="changeHandle" />
              </div>
              <van-divider />
              <div class="second insures">
                <span class="s2">{{this.typesList[8].text}}</span>
                <van-checkbox v-model="scratchChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
                <div class="insures-right">
                  <span>{{scratch}}</span>
                  <van-icon name="arrow-down" @click="choosePopup(scratchList,'scratch')"></van-icon>
                  <span class="money">￥{{scratchPremium}}</span>
                </div>
              </div>
              <van-divider />
              <div class="second insures">
                <span class="s2">{{this.typesList[9].text}}</span>
                <van-checkbox v-model="spiritChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
                <div class="insures-right">
                  <input class="spiritInput" v-model="spiritMount" />
                  <!-- <span>{{spirit}}</span> -->
                  <!-- <van-icon name="arrow-down" @click="choosePopup(spiritList,'spirit')"></van-icon> -->
                  <span class="money">￥{{spiritPremium}}</span>
                </div>
              </div>
              <van-divider />
              <!-- <div class="second">
              <span class="s2">{{this.typesList[10].text}}</span>
              <van-checkbox v-model="facilityChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
              <van-switch v-model="facilitySwitch" size="24px" @change="changeHandle" />
            </div>
              <van-divider />-->
              <div class="second">
                <span class="s2">{{this.typesList[10].text}}</span>
                <van-checkbox v-model="natureChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
                <van-switch v-model="natureSwitch" size="24px" @change="changeHandle" />
              </div>
              <van-divider />
              <van-divider />
              <div class="second">
                <span class="s2">{{this.typesList[11].text}}</span>
                <van-checkbox v-model="wadeChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
                <van-switch v-model="wadeSwitch" size="24px" @change="changeHandle" />
              </div>
              <van-divider />
            </div>
            <div class="close">
              <van-button color="#568EFC" plain v-show="moreShow" @click="moreShow=false">点击收起</van-button>
            </div>
          </div>
        </div>
        <!-- 保单信息 -->
        <div class="warranty" v-show="msgShow">
          <p>中保信平台未返回上年保单信息</p>
          <div class="warranty-btn">
            <van-button plain color="#568EFC" style="margin-right:31px" @click="terrace">平台参考信息</van-button>
            <van-button plain color="#568EFC" @click="offer">报价单</van-button>
          </div>
        </div>
        <div class="offer" v-show="state === '200'">
          <div class="offer-left">
            <p class="p1">￥{{totalPremium}}</p>
            <div class="insures">
              <p>
                商业险 ￥{{bussinesNum}}
                <span
                  class="money"
                  v-show="this.saleDiscount!=0"
                >{{this.saleDiscount}}折</span>
              </p>
              <p>交强险 ￥{{insuranceMoney}}</p>
              <p>车船税 ￥{{shipNum}}</p>

              <van-icon name="edit" class="icon" @click="showPopupSale"></van-icon>
            </div>
            <van-icon></van-icon>
          </div>

          <div class="offer-right">
            <van-button type="info" ref="confirmSale" @click="confimHandle">确认报价</van-button>
          </div>
        </div>
        <div v-show="off">
          <div class="offer" v-show="state === '1'">
            <div class="offer-left">
              <p class="p1">￥--</p>
              <div class="insures">
                <p>
                  商业险 ￥--
                  <span class="money" v-show="this.saleDiscount!=0">{{this.saleDiscount}}折</span>
                </p>
                <p>交强险 ￥--</p>
                <p>车船税 ￥--</p>
                <van-icon name="edit" class="icon" @click="showPopupSale"></van-icon>
              </div>
            </div>

            <div class="offer-right">
              <van-button
                color="#C7C7CC"
                ref="confirmReset"
                @click="resetHandle"
                v-show="!isActives"
              >重新算价</van-button>
            </div>
            <div class="offer-right">
              <van-button
                color="#C7C7CC"
                ref="confirmReset"
                v-show="isActives"
                class="active2"
                @click="resetHandle"
              >重新算价</van-button>
            </div>
            <!-- v-show="this.aaa === true" -->
          </div>
        </div>
        <van-popup v-model="show" class="showPopupSale">
          <h2>修改商业折扣</h2>
          <p>请确保输入值在{{this.lowestDiscount}}-{{this.policyDiscount}}范围之内</p>
          <input type="text" v-model="Discount" />
          <span
            class="number"
            v-show="this.Discount<this.lowestDiscount || this.Discount>this.policyDiscount"
          >
            <van-icon name="info-o"></van-icon>已超过输入值范围，请重新输入
          </span>
          <van-button plain color="#95c4fe" @click="cannelSale">取消</van-button>
          <van-button type="info" @click="confirmSaleDiscount">确定</van-button>
        </van-popup>
      </div>
      <!-- <van-loading vertical v-show="loadingShow" slot="">亲，报价中...
      <!-- <img src="../assets/baijia.png" alt="">-->
      <!-- </van-loading> -->
      <!-- 下拉公共组件 -->
      <van-popup v-model="showPopup" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="confirmPicker"
          @cancel="showPopup = false"
          @change="changeHandle"
        />
      </van-popup>
      <van-popup
        v-model="showIcon"
        class="showIcon11"
        :overlay-style="{opacity : '0'}"
        :close-on-click-overlay="false"
      >
        <img src="../assets/baijia.png" alt />
        <p>亲，报价中...</p>
      </van-popup>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { cpus } from "os";
import {
  price,
  priceToConfirm,
  TerracePage,
  addEngage,
  engage
} from "@/common/library/api";
export default {
  data() {
    return {
      jf: "",
      xj: "",
      ld: "",
      zb: "",
      minDate: new Date(),
      noLicenseFlag: false,
      //新增设备损失险
      equipmentChecked: false,
      bussjiActive: false,
      islijiActive: false,
      long: ["car", "VIN", "engine", "registerDate"],
      city: "京",
      showIcon: false,
      msgShow: false,
      //人工核保意见
      UWNotionShow: false,
      uWNotion: "",
      // 预核保意见
      verificationShow: false,
      issueDate: "",
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      // currentDate: new Date(2019, 10, 1, 11),
      radio: null,
      dataObj: "",
      aaa: false,
      // 险别
      typesList: [
        { code: "A", text: "车辆损失保险" },
        { code: "B", text: "第三者责任险" },
        { code: "D3", text: "司机座位险" },
        { code: "D4", text: "乘客座位险" },
        { code: "G", text: "全车盗抢险" },
        { code: "A1", text: "车辆无法找到第三方险" },
        { code: "F", text: "玻璃单独破碎险" },
        { code: "J1", text: "指定修理厂险" },
        { code: "L", text: "划痕险" },
        { code: "R", text: "精神损害险" },
        // { code: "X", text: "新增设备损失险" },
        { code: "Z", text: "自燃损失险" },
        { code: "X1", text: "涉水行驶损失险" }
      ],
      state: "",
      //车损险最大保额
      maxAmount: "",
      //车损险最小保额
      minAmount: "",
      //车损险保费
      coveragePremium: "",
      //车辆损失险保额
      carAmount: "",
      //总保费
      totalPremium: "",
      //折扣
      Discount: "",
      //一年内过户
      open: false,
      // 往年补缴
      sumTaxDefault: "",
      // 滞纳金
      sumOverdue: "",
      // 车船税合计
      shipNum: "",
      //交强险合计
      insuranceNum: "",
      //商业险合计
      bussinesNum: "",
      taxStartDate: "",
      documentNumber: "",
      deductionDueCode: "",
      //开税凭证地区代码
      taxLocation: "北京市",
      taxLocationList: [
        {
          code: "110000",
          text: "北京市"
        },
        {
          code: "120000",
          text: "天津市"
        },
        {
          code: "130000",
          text: "河北省"
        },
        {
          code: "140000",
          text: "山西省"
        },
        {
          code: "150000",
          text: "内蒙古自治区"
        },
        {
          code: "210000",
          text: "辽宁省"
        },
        {
          code: "220000",
          text: "吉林省"
        },
        {
          code: "230000",
          text: "黑龙江省"
        },
        {
          code: "310000",
          text: "上海市"
        },
        {
          code: "320000",
          text: "江苏省"
        },
        {
          code: "330000",
          text: "浙江省"
        },
        {
          code: "340000",
          text: "安徽省"
        },
        {
          code: "350000",
          text: "福建省"
        },
        {
          code: "360000",
          text: "江西省"
        },
        {
          code: "370000",
          text: "山东省"
        },
        {
          code: "410000",
          text: "河南省"
        },
        {
          code: "420000",
          text: "湖北省"
        },
        {
          code: "430000",
          text: "湖南省"
        },
        {
          code: "440000",
          text: "广东省"
        },
        {
          code: "450000",
          text: "广西壮族自治区"
        },
        {
          code: "460000",
          text: "海南省"
        },
        {
          code: "500000",
          text: "重庆市"
        },
        {
          code: "510000",
          text: "四川省"
        },
        {
          code: "520000",
          text: "贵州省"
        },
        {
          code: "530000",
          text: "云南省"
        },
        {
          code: "540000",
          text: "西藏自治区"
        },
        {
          code: "610000",
          text: "陕西省"
        },
        {
          code: "620000",
          text: "甘肃省"
        },
        {
          code: "630000",
          text: "青海省"
        },
        {
          code: "640000",
          text: "宁夏回族自治区"
        },
        {
          code: "650000",
          text: "新疆维吾尔自治区"
        },
        {
          code: "710000",
          text: "台湾省"
        },
        {
          code: "810000",
          text: "香港特别行政区"
        },
        {
          code: "820000",
          text: "澳门特别行政区"
        }
      ],

      //减免方案
      deductionDueType: "比例减免",
      deductionDueTypeList: [
        { code: "P", text: "比例减免" },
        { code: "A", text: "金额减免" }
      ],
      //免税车型
      deductionDue: "具备减免税证明",
      deductionDueList: [
        { code: "M1", text: "具备减免税证明" },
        { code: "M2", text: "拖拉机" },
        { code: "M3", text: "军队、武警专用车" },
        { code: "M4", text: "警车" },
        { code: "M5", text: "外国使领馆、国际组织及其人员" },
        { code: "M6", text: "能源减免" },
        { code: "M8", text: "机场、港口、铁路内部行驶或者作业车辆" },
        { code: "M9", text: "其他" }
      ],
      //完税凭证填发日期
      taxDocumentDate: "",
      //减免比例
      deductionDueProportion: "",
      //纳税地区代码
      taxLocationCode: "",
      // 税务机关代码
      taxDepartmentCode: "",
      // 税务机关名称
      taxDepartment: "",
      insuranceMoney: "",
      //身份证号
      identifyNo: "",
      //车主姓名
      carName: "",
      //发动机号
      engine: "",
      //车架号
      VIN: "",
      //车牌号
      plateNo: "",
      // 总价格
      sumShow: false,
      //添加更多保险
      moreShow: false,
      value: "",
      //涉水行驶损失险
      wadeChecked: false,
      wadeSwitch: false,
      //节假日限额翻倍
      holidayChecked: false,
      holidaySwitch: false,
      //自然损失险
      natureChecked: false,
      natureSwitch: false,
      //新增设备险
      // facilityChecked: false,
      // facilitySwitch: false,
      //精神损害险
      spiritChecked: false,
      spiritPremium: "",
      //划痕险
      scratchChecked: false,
      scratchPremium: "",
      // 指定修理厂险
      domesticSwitch: false,
      //玻璃单独破碎险
      importSwitch: false,
      // 车损第三方
      damageSwitch: false,
      //全车盗抢险
      robbingChecked: false,
      robbingSwitch: false,
      //乘客座位险
      fareChecked: false,
      //司机座位险
      driverChecked: false,
      driverPremium: "",
      //第三者责任险
      secondChecked: false,
      secondPremium: "",
      //车辆损失保险
      carChecked: false,
      carSwitch: false,
      carPremium: "",
      //商业险按钮
      bussines: false,
      //显示车船税
      shipShow: false,
      //交强险按钮
      checked: false,
      //投保方案
      isShowScheme: false,
      //车主信息
      isShowCarMaster: false,
      // 车辆信息按钮
      isShowCar: false,
      // 人工核保按钮
      isShowArt: false,
      // 预核保按钮
      isShow: false,
      //证件类型下拉框
      columns: "",
      // 记录选择器对应name
      currentPicker: "",
      showPopup: false,
      //   车辆类型
      car: "请选择",
      carList: [{ code: "A0", text: "小型普通客车" }],
      // { code: "H0", text: "货车" }]
      currentDate: "",
      //   初登日期
      currentDate2: "",
      currentDateName: "",
      // currentDate:'',
      // 默认不显示日期组件
      showPopupDate: false,
      showPopupDate2: false,
      showPopupDate5: false,
      //车主信息-证件类型
      card: "身份证",
      cardList: [
        { code: "01", text: "身份证" },
        { code: "03", text: "护照" },
        { code: "553", text: "外国人永久居住证" }
      ],
      payTax: "正常缴税",
      payTaxList: [
        { code: "1N", text: "正常缴税" },
        { code: "2W", text: "已完税" },
        { code: "3M", text: "免税" },
        { code: "4J", text: "减税" },
        { code: "5H", text: "拒缴", disabled: true },
        { code: "6B", text: "不征" }
      ],
      //第三者责任险
      second: "不投保",
      secondList: [
        "不投保",
        "5万元",
        "10万元",
        "15万元",
        "20万元",
        "30万元",
        "50万元",
        "100万元",
        "150万元",
        "200万元",
        "250万元",
        "300万元",
        "350万元",
        "400万元",
        "450万元",
        "500万元",
        "550万元",
        "600万元",
        "650万元",
        "700万元",
        "750万元",
        "800万元",
        "850万元",
        "900万元",
        "950万元",
        "100万元"
      ],
      //司机座位险
      driver: "不投保",
      driverList: [
        "不投保",
        "0.5万元",
        "1万元",
        "2万元",
        "3万元",
        "4万元",
        "5万元",
        "10万元",
        "15万元",
        "20万元",
        "30万元"
      ],
      //乘客座位险
      farePremium: "",
      fare: "不投保",
      fareList: [
        "不投保",
        "0.5万元",
        "1万元",
        "2万元",
        "3万元",
        "4万元",
        "5万元",
        "10万元",
        "15万元",
        "20万元",
        "30万元"
      ],
      // 玻璃单独破碎险
      import1: "进口",
      percent: "10%",
      percent1: "15%",
      importList: [{ code: 1, text: "进口" }, { code: 1, text: "国产" }],
      importList1: [
        "10%",
        "11%",
        "12%",
        "13%",
        "14%",
        "15%",
        "16%",
        "17%",
        "18%",
        "19%",
        "20%",
        "21%",
        "22%",
        "23%",
        "24%",
        "25%",
        "26%",
        "27%",
        "28%",
        "29%",
        "30%"
      ],
      isShow: true,
      importList2: [
        "15%",
        "16%",
        "17%",
        "18%",
        "19%",
        "20%",
        "21%",
        "22%",
        "23%",
        "24%",
        "25%",
        "26%",
        "27%",
        "28%",
        "29%",
        "30%",
        "31%",
        "32%",
        "33%",
        "34%",
        "35%",
        "36%",
        "37%",
        "38%",
        "39%",
        "40%",
        "41%",
        "42%",
        "43%",
        "44%",
        "45%",
        "46%",
        "47%",
        "48%",
        "49%",
        "50%",
        "51%",
        "52%",
        "53%",
        "54%",
        "55%",
        "56%",
        "57%",
        "58%",
        "59%",
        "60%"
      ],
      spiritMount: "",
      //划痕险
      scratch: "不投保",
      scratchList: ["不投保", "2000", "5000", "10000", "20000"],
      // // 精神损害险
      // spirit: "不投保",
      // spiritList: ["不投保", "", ""],
      // 日期
      date1: "",
      registerDate: new Date(),
      certificateDate: "",
      busRegisterDate: "",
      RegDate: "",
      insRegDate: "",
      aa: "",
      // 品牌型号
      model: "请选择品牌型号",
      // 使用性质
      motorUsageTypeCode: "",
      motorTypeCode: "",
      // 证件类型编号
      identifyType: "",
      // 免税车型编号
      deductionDueCode: "",
      // 缴税类型编号
      taxConditionCode: "",
      // 订单号
      orderNo: "",
      //险种数组长度
      riskListLength: "",
      kindCode: "",
      datas: "",
      //确认报价
      confirm: false,
      //重新算价
      off: true,
      noLicenseFlag: "",

      isActives: false,
      // 折扣
      secondAmount: "0",
      // 折扣弹出层
      show: false,
      // 商业险最低折扣
      lowestDiscount: "",
      //商业险最高折扣
      policyDiscount: "",
      saleDiscount: "",
      // 预核保信息
      iLogPreUdwMess: "",
      data2: "",
      // 贷款车标识
      loanCar: false,
      // 特别约定
      loanCarPopup: false,
      checked: false,
      checked1: false,
      checked5: false,
      checked2: false,
      // checked3: false,
      // checked4: false,
      // checked4: false,
      beneficiaryContent: "",
      engageList: [],
      addShow: true,
      radio: "1",
      transferDate: "",
      endDate: "",
      clauseType: 3,
      ciSumPermium: "",
      sumPermium: "",
      loadingShow: false,
      // 车辆所属城市
      city: "京",
      cityList: [
        "京",
        "津",
        "冀",
        "鲁",
        "豫",
        "黑",
        "辽",
        "吉",
        "晋",
        "浙",
        "皖",
        "沪",
        "闽",
        "渝",
        "赣",
        "蒙",
        "鄂",
        "新",
        "湘",
        "宁",
        "粤",
        "藏",
        "琼",
        "桂",
        "川",
        "贵",
        "云",
        "陕",
        "甘",
        "青",
        "苏",
        "港",
        "澳",
        "台"
      ]
      // isOk: false
    };
  },

  // /修改列表页的meta值，false时再次进入页面会重新请求数据。
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false;
    next();
  },

  mounted() {
    this.handle();
  },
  created() {
    var data = JSON.parse(sessionStorage.getItem("data"));
    var abc = data.car;
    console.log(data);
    if (data.state == 200) {
      this.handle();
      this.msgShow = true;
    } else if (data.state == 1) {
      this.handle();
      this.msgShow = false;
    }
  },
  watch: {
    data(val) {
      this.aaa = false;
      this.isActives = true;
    },
    $route() {
      this.model = this.$route.query.name;
    }
  },
  methods: {
    businessBtn() {
      if (!this.bussines == false) {
        this.carChecked = false;
        this.carSwitch = false;
        this.carPremium = "";
        this.carAmount = "";
        this.minAmount = "";
        this.maxAmount = "";
      }
    },
    handleToast() {
      if (this.carSwitch == false) {
        this.$toast(
          "此险为车辆损失险（主险）的附加险，请投保车辆损失险（主险）再选择此险！"
        );
        this.carChecked = false;
      }
    },
    tipC() {
      if (this.VIN == "") {
        this.$toast("车架号不能为空");
      }
    },
    tipF() {
      if (this.engine == "") {
        this.$toast("发动机号不能为空");
      }
    },
    tipN() {
      if (this.carName == "") {
        this.$toast("车主姓名不能为空");
      }
    },
    tipCarno() {
      if (this.identifyNo == "") {
        this.$toast("身份证号不能为空");
      }
    },
    backHandle() {
      this.$router.push({ path: "/" });
      return false;
    },
    number(value) {
      value = value.toUpperCase();
      var z = new RegExp(/[^QIO]/g);
      value = value.match(z);
      if (value !== null) {
        value = value.join("");
        value = value.replace(/[^\w\.\/]/gi, "");
        this.VIN = value;
      } else {
        this.VIN = "";
      }
    },
    faNum(value) {
      value = value.toUpperCase();
      var y = new RegExp(/[^QIO]/g);
      value = value.match(y);
      if (value !== null) {
        value = value.join("");
        value = value.replace(/[^\w\.\/]/gi, "");
        this.engine = value;
      } else {
        this.engine = "";
      }
    },
    // spirits(spiritMount) {
    //   if (this.spiritMount == "" && this.secondChecked == true) {
    //     this.$toast(
    //       "此险为第三者责任险（主险）的附加险，请投保第三者责任险（主险）再选择此险！"
    //     );
    //     this.spiritChecked = false;
    //   }
    // },
    changeHandle() {
      this.isActives = true;
      this.$refs.confirmSale.innerHTML = "重新算价";
      this.$refs.confirmSale.style.width = "150px";

      if (this.second == "不投保" && this.secondChecked == true) {
        this.$toast(
          "此险为第三者责任险（主险）的附加险，请投保第三者责任险（主险）再选择此险！"
        );
        this.secondChecked = false;
      }
      if (this.driver == "不投保" && this.driverChecked == true) {
        this.$toast(
          "此险为司机座位险（主险）的附加险，请投保司机座位险（主险）再选择此险！"
        );
        this.driverChecked = false;
      }
      if (this.fare == "不投保" && this.fareChecked == true) {
        this.$toast(
          "此险为乘客座位险（主险）的附加险，请投保乘客座位险（主险）再选择此险！"
        );
        this.fareChecked = false;
      }
      if (this.robbingSwitch == false && this.robbingChecked == true) {
        this.$toast(
          "此险为全车盗抢险（主险）的附加险，请投保全车盗抢险（主险）再选择此险！"
        );
        this.robbingChecked = false;
      }
      if (this.scratch == "不投保" && this.scratchChecked == true) {
        this.$toast(
          "此险为划痕损害险（主险）的附加险，请投保划痕损害险（主险）再选择此险！"
        );
        this.scratchChecked = false;
      }

      if (this.natureSwitch == false && this.natureChecked == true) {
        this.$toast(
          "此险为自燃损失险（主险）的附加险，请投保自然损失险（主险）再选择此险！"
        );
        this.natureChecked = false;
      }
      if (this.spiritMount == "") {
        if (this.spiritChecked == true) {
          this.$toast(
            "此险为精神损害险（主险）的附加险，请投保精神损害险（主险）再选择此险！"
          );
        }
        this.spiritChecked = false;
      }

      if (this.wadeSwitch == false && this.wadeChecked == true) {
        this.$toast(
          "此险为涉水行驶损失险（主险）的附加险，请投保涉水行驶损失险（主险）再选择此险！"
        );
        this.wadeChecked = false;
      }
      if (this.carSwitch == false) {
        this.carChecked = false;
      }
      if (this.secondChecked == false) {
        if (this.spiritMount !== "") {
          this.$toast(
            "此险为第三者责任险（主险）的附加险，请投保第三者责任险（主险）再选择此险！"
          );
          this.spiritMount = "";
        }
      }
      if (this.carSwitch == false) {
        if (
          this.damageSwitch == true ||
          this.importSwitch == true ||
          this.domesticSwitch == true ||
          this.secondChecked == true ||
          this.natureSwitch == true ||
          this.wadeSwitch == true
        ) {
          this.$toast(
            "此险为车辆损失险（主险）的附加险，请投保车辆损失险（主险）再选择此险！"
          );
          this.domesticSwitch = false;
          this.importSwitch = false;
          this.damageSwitch = false;
          // this.secondChecked = false;
          this.natureSwitch = false;
          this.wadeSwitch = false;
        }
      }
      //   if (this.carSwitch == true) {
      //   this.carChecked = true;
      // }
      // if (this.second !== "不投保") {
      //   this.secondChecked = true;
      // }
      // if (this.driver !== "不投保") {
      //   this.driverChecked = true;
      // }

      // if (this.fare !== "不投保") {
      //   this.fareChecked == true;
      // }
      // if (this.robbingSwitch == true) {
      //   this.robbingChecked == true;
      // }
      // if (this.scratch !== "不投保") {
      //   this.scratchChecked = true;
      // }
      // if (this.natureSwitch == true) {
      //   this.natureChecked == true;
      // }
      // if (this.natureSwitch == true) {
      //   this.natureChecked == true;
      // }
      // if (this.spiritMount !== "") {
      //   this.spiritChecked == true;
      // }
      // if (this.wadeSwitch == true) {
      //   this.wadeChecked == true;
      // }
    },
    // 车辆品牌
    CarPaiHandle() {
      this.$refs.confirmSale.innerHTML = "重新算价";
      this.$refs.confirmSale.style.width = "150px";
      // this.$refs.confirmSale.style.background = "#ccc";
      this.$router.push({ path: "/Vehicle" });
    },
    radioBtn() {
      console.log(this.radio);

      this.beneficiaryContent = this.radio.engageDetail;
    },
    // 添加特约
    async beneficiaryHandle() {
      const data = await addEngage({
        engageDetail: this.beneficiaryContent
      });
      if (data.state == 200) {
        this.loanCarPopup = false;
      }
    },
    quick1() {
      this.$refs.confirmSale.innerHTML = "重新算价";
      this.$refs.confirmSale.style.width = "150px";
      this.$refs.confirmSale.style.background = "#568efc";
      this.bussjiActive = !this.bussjiActive;
      if (this.bussjiActive == true) {
        this.busRegisterDate = new Date();
        console.log(this.busRegisterDate);
        var date = this.busRegisterDate;
        this.busRegisterDate = dayjs(date)
          .add(1, "hour")
          .format("YYYY-MM-DD HH");
        this.RegDate = dayjs(date)
          .add(1, "year")
          .format("YYYY-MM-DD 24");
        // this.RegDate = dayjs(this.RegDate)
        // .add(-1, "day")
        // .format("YYYY-MM-DD 24");
      } else {
        this.busRegisterDate = this.ld;
        this.RegDate = this.zb;
      }
    },
    quick2() {
      this.$refs.confirmSale.innerHTML = "重新算价";
      this.$refs.confirmSale.style.width = "150px";
      this.$refs.confirmSale.style.background = "#568efc";
      this.islijiActive = !this.islijiActive;
      // this.$refs.button2.color = "#3F7CF5";
      if (this.islijiActive == true) {
        this.insRegDate = new Date();
        console.log(this.insRegDate);
        var date = this.insRegDate;
        this.insRegDate = dayjs(date)
          .add(1, "hour")
          .format("YYYY-MM-DD HH");
        this.endDate = dayjs(date)
          .add(1, "year")
          .format("YYYY-MM-DD HH");
        this.endDate = dayjs(this.endDate)
          .add(1, "hour")
          .format("YYYY-MM-DD HH");
      } else {
        this.endDate = this.xj;
        this.insRegDate = this.jf;
      }
    },
    check(index) {},
    // 显示手动添加特约框
    addShowInput() {
      this.addShow = !this.addShow;
      this.checked4 = true;
      this.checked5 = true;
    },

    // 特别约定
    async loanCarButton() {
      this.loanCarPopup = true;
      const data = await engage({});
      if (data.state == 200) {
        this.engageList = data.data;
        // this.engageList.forEach(item => {
        //   item.isOk = false;
        // });
      }
    },
    confirmloanCar() {},
    //平台信息参考
    async terrace() {
      // var data = this.$route.params.data;
      var data = JSON.parse(sessionStorage.getItem("data"));
      var orderNo = data.data.orderNo;
      this.$router.push({
        name: "infoPlatform",

        params: { orderNo }
      });
    },
    //报价单
    offer() {
      // var data = this.$route.params.data;
      var data = JSON.parse(sessionStorage.getItem("data"));
      var orderNo = data.data.orderNo;
      this.$router.push({
        name: "offer",
        params: { orderNo }
      });
      console.log(orderNo);
    },
    //折扣弹出层
    showPopupSale() {
      this.show = true;
      this.saleDiscount = "";
    },
    //渲染页面
    handle() {
      console.log(2222222);
      var data = JSON.parse(sessionStorage.getItem("data"));
      console.log(data);
      if (data.state == 1) {
        this.$refs.confirmSale.innerHTML = "重新算价";
        this.$refs.confirmSale.style.width = "150px";
        this.$refs.confirmSale.style.background = "#568efc";
        this.isShowArt = false;
        this.isShowCar = true;
        // this.isActives = false;
      }
      if (data.state == 200) {
        this.$refs.confirmSale.innerHTML = "确认报价";
        this.$refs.confirmSale.style.width = "150px";
        this.$refs.confirmSale.style.background = "#568efc";
      }
      if (data.state == 200 || data.state == 1) {
        // this.loanCarPopup = data.data.car.loanStatus;
        this.state = data.state;
        this.loanCar = data.data.car.loanStatus;
        this.noLicenseFlag = data.data.car.noLicenseFlag;
        this.ciSumPermium = data.data.ciSumPermium;
        console.log(this.loanCar);
        if (data.data.engageInfo) {
          this.beneficiaryContent = data.data.engageInfo.engageDetail;
        }
        //车牌号
        this.plateNo = data.data.car.plateNo;
        //品牌型号
        this.model = data.data.car.model;

        // console.log(data.data.sumPermium);
        //预核保意见
        if (data.data.iLogPreUdwMess) {
          this.verificationShow = true;
          this.iLogPreUdwMess = data.data.iLogPreUdwMess;
        }
        //人工核保意见
        if (data.data.uWNotion) {
          this.UWNotionShow = true;
          this.uWNotion = data.data.uWNotion;
        }

        //初登日期
        // console.log(data.data.car.registerDate);
        if (data.data.car.registerDate) {
          // console.log(11111);
          // this.registerDate = new Date();
          this.registerDate = dayjs(data.data.car.registerDate).format(
            "YYYY-MM-DD"
          );
        } else if (data.data.car.registerDate == null) {
          console.log(3333333);
          this.registerDate = "";
        }
        for (var i = 0; i < this.carList.length; i++) {
          if (this.carList[i].code === data.data.car.motorTypeCode) {
            this.motorTypeCode = this.carList[i].code;
            this.car = this.carList[i].text;
          }
        }
        //订单号
        this.orderNo = data.data.orderNo;
        // console.log(this.orderNo);

        //是否新车

        this.noLicenseFlag = data.data.car.noLicenseFlag;
        //使用性质
        this.motorUsageTypeCode = data.data.car.motorUsageTypeCode;
        console.log(this.motorUsageTypeCode);
        //车架号
        this.VIN = data.data.car.vin;
        this.engine = data.data.car.engine;
        this.registerDate = data.data.car.registerDate;
        this.transferDate = data.data.car.transferDate;
        this.carName = data.data.customer.name;
        //身份证号
        this.identifyNo = data.data.customer.identifyNo;
        //证件类型
        for (var i = 0; i < this.cardList.length; i++) {
          // console.log(this.cardList[i].code)
          // console.log(data.data.customer.identifyType)
          if (this.cardList[i].code === data.data.customer.identifyType) {
            this.identifyType = this.cardList[i].code;
            // this.identifyType = this.cardList[i].code;
            this.card = this.cardList[i].text;
          }
        }

        // console.log("5465466878798798");
        //交强险
        for (var i = 0; i < data.data.riskList.length; i++) {
          this.riskListLength = data.data.riskList.length;
          if (data.data.riskList[i].riskCode === "0507") {
            this.riskCode = data.data.riskList[i].riskCode;
            this.checked = true;
            this.insuranceNum = data.data.riskList[i].premium;

            //这有个问题
            this.insuranceMoney = data.data.riskList[i].premium;
            //这有个问题

            this.insRegDate = data.data.riskList[i].startDate;
            this.jf = this.insRegDate;
            this.endDate = data.data.riskList[i].endDate;
            this.xj = this.endDate;
            //车船税
            for (var i = 0; i < this.payTaxList.length; i++) {
              if (this.payTaxList[i].code === data.data.tax.taxConditionCode) {
                this.taxConditionCode = this.payTaxList[i].code;
                this.payTax = this.payTaxList[i].text;
              }
            }
            //纳税地区代码
            for (var i = 0; i < this.taxLocationList.length; i++) {
              if (
                this.taxLocationList[i].code === data.data.tax.taxLocationCode
              ) {
                this.taxLocationCode = this.taxLocationList[i].code;
                this.taxLocation = this.taxLocationList[i].text;
              }
            }
            // 往年补缴
            this.sumTaxDefault = data.data.tax.sumTaxDefault;
            //滞纳金
            this.sumOverdue = data.data.tax.sumOverDue;
            //车船税合计
            this.shipNum = data.data.tax.sumTax;
            //完税凭证号码
            this.documentNumber = data.data.tax.documentNumber;
            //税务机关代码
            this.taxDepartmentCode = data.data.tax.taxDepartmentCode;
            //税务机关名称
            this.taxDepartment = data.data.tax.taxDepartment;
            //  完税凭证填发日期
            this.taxDocumentDate = data.data.tax.taxDocumentDate;
            //免税车型
            for (var i = 0; i < this.deductionDueTypeList.length; i++) {
              if (
                this.deductionDueList[i].code === data.data.tax.deductionDueCode
              ) {
                this.deductionDueCode = this.deductionDueList[i].code;
                this.deductionDue = this.deductionDueList[i].text;
              }
            }
            //减免方案
            for (var i = 0; i < this.deductionDueTypeList.length; i++) {
              if (
                this.deductionDueTypeList[i].code ===
                data.data.tax.deductionDueType
              ) {
                this.deductionDueType = this.deductionDueTypeList[i].code;
                this.deductionDueType = this.deductionDueList[i].text;
                //减免比例
                this.deductionDueProportion =
                  data.data.tax.deductionDueProportion;
              }
            }
          } else if (data.data.riskList[i].riskCode === "0520") {
            this.busRiskCode = data.data.riskList[i].riskCode;
            console.log(this.busRiskCode);
            this.bussines = true;
            this.bussinesNum = data.data.riskList[i].premium;
            this.busRegisterDate = data.data.riskList[i].startDate;
            this.ld = this.busRegisterDate;
            this.RegDate = data.data.riskList[i].endDate;
            this.zb = this.RegDate;
          }
        }
        //车辆损失险
        for (var i = 0; i < data.data.kindList.length; i++) {
          if (data.data.kindList[i].kindCode == "A") {
            this.carChecked = data.data.kindList[i].notDeductibleFlag;
            this.carSwitch = true;
            this.carChecked = true;
            this.carPremium = data.data.kindList[i].coveragePremium;
            this.carAmount = data.data.kindList[i].amount;
            this.maxAmount = data.data.maxAmount;
            this.minAmount = data.data.minAmount;
          }
        }
        for (var i = 0; i < data.data.kindList.length; i++) {
          //第三者责任险
          if (data.data.kindList[i].kindCode == "B") {
            console.log(data.data.kindList[i].coveragePremium);
            this.second = data.data.kindList[i].amount;
            this.second = this.second / 10000 + "万元";
            this.secondPremium = data.data.kindList[i].coveragePremium;
            this.secondChecked = data.data.kindList[i].notDeductibleFlag;
            console.log(this.secondPremium);
          }
          //司机座位
          else if (data.data.kindList[i].kindCode == "D3") {
            this.driver = data.data.kindList[i].amount;
            this.driver = this.driver / 10000 + "万元";

            this.driverPremium = data.data.kindList[i].coveragePremium;
            this.driverChecked = data.data.kindList[i].notDeductibleFlag;
            console.log(this.driverPremium);
          } //乘客座位险
          else if (data.data.kindList[i].kindCode == "D4") {
            this.fare = data.data.kindList[i].amount;

            this.fare = this.fare / 10000 + "万元";
            this.farePremium = data.data.kindList[i].coveragePremium;
            this.fareChecked = data.data.kindList[i].notDeductibleFlag;
          }
          //全车盗抢险
          else if (data.data.kindList[i].kindCode == "G") {
            this.robbingChecked = data.data.kindList[i].notDeductibleFlag;
            this.robbingSwitch = true;
          }
          //车辆无法找到第三方险
          else if (data.data.kindList[i].kindCode == "A1") {
            this.damageSwitch = true;
          } //玻璃单独破碎险
          else if (data.data.kindList[i].kindCode == "F") {
            this.importSwitch = true;
          } // 指定修理厂险
          else if (data.data.kindList[i].kindCode == "J1") {
            this.domesticSwitch = true;
          } // 划痕险
          else if (data.data.kindList[i].kindCode == "L") {
            this.scratch = data.data.kindList[i].amount;
            this.scratchPremium = data.data.kindList[i].coveragePremium;
            this.scratchChecked = data.data.kindList[i].notDeductibleFlag;
            console.log(this.scratchPremium);
          }
          // 精神损害险
          else if (data.data.kindList[i].kindCode == "R") {
            this.spiritMount = data.data.kindList[i].amount;
            this.spiritPremium = data.data.kindList[i].coveragePremium;
            this.spiritChecked = data.data.kindList[i].notDeductibleFlag;
            console.log(this.spiritPremium);
          }
          // 自燃损失险
          else if (data.data.kindList[i].kindCode == "Z") {
            this.natureSwitch = true;
            this.natureChecked = data.data.kindList[i].notDeductibleFlag;
          } // 涉水行驶损失险
          else if (data.data.kindList[i].kindCode == "X1") {
            this.wadeSwitch = true;
            this.wadeChecked = data.data.kindList[i].notDeductibleFlag;
          }
        }
        // 折扣
        this.saleDiscount = data.data.saleDiscount;
        //总保费
        this.totalPremium = data.data.sumPermium;
      } else {
        this.$toast.fail("失败");
      }
    },

    //重新算价
    async resetHandle() {
      this.loadingShow = true;
      this.showIcon = true;
      window.sessionStorage.getItem("token");
      // console.log([56465])
      // 特约信息
      var engageInfo = new Object();
      console.log(this.engageDetail);
      engageInfo.engageDetail = this.engageDetail;
      //特约信息
      var engageInfo = new Object();
      engageInfo.clauseType = this.clauseType;
      engageInfo.engageDetail = this.beneficiaryContent;
      //车辆信息
      var car = new Object();
      car.engine = this.engine;
      car.vin = this.VIN;
      car.plateNo = this.plateNo;
      car.model = this.model;
      car.motorTypeCode = this.motorTypeCode;
      car.motorUsageTypeCode = this.motorUsageTypeCode;
      car.registerDate = this.registerDate;
      car.transferFlag = this.open;
      car.noLicenseFlag = this.noLicenseFlag;
      car.transferDate = this.issueDate;
      car.firstBeneMan = this.beneficiaryContent;
      //车主信息
      var customer = new Object();
      customer.identifyNo = this.identifyNo;
      customer.identifyType = this.identifyType;
      customer.name = this.carName;
      //车船税
      var tax = new Object();
      tax.deductionDueCode = this.deductionDueCode;
      tax.deductionDueProportion = this.deductionDueProportion;
      tax.documentNumber = this.documentNumber;
      tax.sumOverDue = this.sumOverdue;
      tax.sumTax = this.shipNum;
      tax.sumTaxDefault = this.sumTaxDefault;
      tax.taxConditionCode = "1";
      tax.taxDepartment = this.taxDepartment;
      tax.taxDepartmentCode = this.taxDepartmentCode;
      tax.taxLocationCode = this.taxLocationCode;
      //险种
      var riskList = [];
      var risk1 = {};
      if (this.checked == true) {
        risk1.amount = this.insuranceNum;
        // kind1.endDate = this.endDate;

        risk1.premium = this.insuranceMoney;
        risk1.riskCode = this.riskCode;
        risk1.startDate = this.insRegDate;
        risk1.endDate = this.endDate;

        riskList.push(risk1);
      }

      var risk2 = {};
      // kind2.amount = this.insuranceNum;
      if (this.bussines == true) {
        risk2.endDate = this.RegDate;
        risk2.premium = this.bussinesNum;
        risk2.riskCode = "0520";
        risk2.startDate = this.busRegisterDate;
        riskList.push(risk2);
      }

      //险别
      var kindList = [];
      //车辆损失险
      var kind1 = {};
      if (this.carSwitch == true) {
        kind1.amount = this.carAmount;
        kind1.coveragePremium = this.coveragePremium;
        kind1.kindCode = this.typesList[0].code;
        kind1.notDeductibleFlag = this.carChecked;
        kind1.kindName = this.typesList[0].text;
        kindList.push(kind1);
      }
      //第三者险
      if (this.second !== "不投保") {
        var kind2 = {};
        this.second = this.second.replace("万元", "0000");
        kind2.amount = this.second;
        kind2.coveragePremium = this.secondAmount;
        kind2.kindCode = this.typesList[1].code;
        kind2.notDeductibleFlag = this.secondChecked;
        kind2.kindName = this.typesList[1].text;
        kindList.push(kind2);
      }
      //司机座位险
      if (this.driver !== "不投保") {
        var kind3 = {};
        kind3.kindCode = this.typesList[2].code;
        kind3.notDeductibleFlag = this.driverChecked;
        if (this.driver == "0.5万元") {
          this.driver = "5000";
        } else {
          this.driver = this.driver.replace("万元", "0000");
        }
        kind3.amount = this.driver;
        kind3.coveragePremium = this.driverPremium;
        kind3.kindName = this.typesList[2].text;

        kindList.push(kind3);
      }
      //乘客座位险
      if (this.fare !== "不投保") {
        var kind4 = {};
        kind4.kindCode = this.typesList[3].code;
        kind4.notDeductibleFlag = this.fareChecked;
        if (this.fare == "0.5万元") {
          this.fare = "5000";
        } else {
          this.fare = this.fare.replace("万元", "0000");
        }
        kind4.amount = this.fare;
        kind4.coveragePremium = this.farePremium;
        kind4.kindName = this.typesList[3].text;
        kindList.push(kind4);
      }
      //全车盗抢险
      var kind5 = {};
      if (this.robbingSwitch == true) {
        kind5.kindCode = this.typesList[4].code;
        kind5.notDeductibleFlag = this.robbingChecked;
        kind5.kindName = this.typesList[4].text;
        kindList.push(kind5);
      }

      //车辆无法找到第三方险
      if (this.damageSwitch == true) {
        var kind6 = {};
        kind6.kindCode = this.typesList[5].code;
        kind6.kindName = this.typesList[5].text;
        kindList.push(kind6);
      }

      //玻璃单独破碎险
      if (this.importSwitch == true) {
        var kind7 = {};
        kind7.kindCode = this.typesList[6].code;
        kind7.kindName = this.typesList[6].text;
        kindList.push(kind7);
      }

      //指定修理厂险
      if (this.domesticSwitch == true) {
        var kind8 = {};
        kind8.kindCode = this.typesList[7].code;
        kind8.kindName = this.typesList[7].text;
        kindList.push(kind8);
      }
      // 划痕险
      if (this.scratch !== "不投保") {
        var kind9 = {};
        kind9.kindCode = this.typesList[8].code;
        kind9.amount = this.scratch;
        kind9.notDeductibleFlag = this.scratchChecked;
        kind9.kindName = this.typesList[8].text;
        kindList.push(kind9);
      }
      // 精神损害险
      if (this.spiritMount !== "") {
        var kind10 = {};
        kind10.kindCode = this.typesList[9].code;
        kind10.amount = this.spiritMount;
        kind10.notDeductibleFlag = this.spiritChecked;
        kind10.kindName = this.typesList[9].text;
        kindList.push(kind10);
      }

      // //新增设备损失险
      // if (this.facilitySwitch == true) {
      //   var kind11 = {};
      //   kind11.kindCode = this.typesList[10].code;
      //   kind11.notDeductibleFlag = this.facilityChecked;
      //   kind11.kindName = this.typesList[10].text;
      //   kindList.push(kind11);
      // }
      //自燃损失险
      if (this.natureSwitch == true) {
        var kind11 = {};
        kind11.kindCode = this.typesList[10].code;
        kind11.notDeductibleFlag = this.natureChecked;
        kind11.kindName = this.typesList[10].text;
        kindList.push(kind11);
      }
      //涉水行驶损失险
      if (this.wadeSwitch == true) {
        var kind12 = {};
        kind12.kindCode = this.typesList[11].code;
        kind12.notDeductibleFlag = this.wadeChecked;
        kind12.kindName = this.typesList[11].text;
        kindList.push(kind12);
      }
      // if (this.secondChecked == false){
      //   if (this.spiritChecked == true){
      //     alert('主险没投，不能投附加险')
      //   }
      //   return
      // }

      const data = await price({
        car,
        customer,
        tax,
        saleDiscount: this.saleDiscount,
        orderNo: this.orderNo,
        riskList,
        kindList,
        engageInfo
      });
      window.sessionStorage.setItem("data", JSON.stringify(data));

      if (data.state === "200") {
        this.$refs.confirmSale.innerHTML = "确认报价";
        this.$refs.confirmSale.style.width = "150px";
        this.$refs.confirmSale.style.background = "#568efc";
        this.showIcon = false;
        this.loadingShow = false;
        this.aaa = true;
        this.isActives = false;
        this.handle();
        console.log(this.aaa);
        this.msgShow = true;
        console.log(data);
        this.ciSumPermium = data.data.ciSumPermium;
        console.log(this.ciSumPermium);
        // this.$toast("成功");
        if (data.data.iLogPreUdwMess) {
          this.verificationShow = true;
          this.iLogPreUdwMess = data.data.iLogPreUdwMess;
        }
        console.log(data);

        this.lowestDiscount = data.data.lowestDiscount;
        console.log(this.lowestDiscount);
        this.policyDiscount = data.data.policyDiscount;
        console.log(this.policyDiscount);
        this.saleDiscount = data.data.saleDiscount;
        this.maxAmount = data.data.maxAmount;
        this.minAmount = data.data.minAmount;
        this.orderNo = data.data.orderNo;
        this.totalPremium = data.data.sumPermium;
        this.state = data.state;
        //车牌号
        this.plateNo = data.data.car.plateNo;
        //初登日期

        this.registerDate = dayjs(data.data.car.registerDate).format(
          "YYYY-MM-DD"
        );
        console.log(this.registerDate);
        for (var i = 0; i < this.carList.length; i++) {
          if (this.carList[i].code === data.data.car.motorTypeCode) {
            this.motorTypeCode = this.carList[i].code;
            this.car = this.carList[i].text;
          }
        }
        if (data.data.engageInfo) {
          this.beneficiaryContent = data.data.engageInfo.engageDetail;
        }
        //订单号
        this.orderNo = data.data.orderNo;
        //是否过户
        // this.open = data.data.car.noLicenseFlag;
        // this.noLicenseFlag = data.data.car.noLicenseFlag;
        //使用性质
        this.motorUsageTypeCode = data.data.car.motorUsageTypeCode;
        //车架号
        this.VIN = data.data.car.vin;
        this.engine = data.data.car.engine;
        this.registerDate = data.data.car.registerDate;
        this.carName = data.data.customer.name;
        //身份证号
        this.identifyNo = data.data.customer.identifyNo;
        //证件类型
        for (var i = 0; i < this.cardList.length; i++) {
          if (this.cardList[i].code === data.data.customer.identifyType) {
            this.identifyType = this.cardList[i].code;
            console.log(154646868);
            console.log(this.identifyType);
            this.card = this.cardList[i].text;
          }
        }
        //交强险
        for (var i = 0; i < data.data.riskList.length; i++) {
          this.riskListLength = data.data.riskList.length;
          if (data.data.riskList[i].riskCode === "0507") {
            this.riskCode = data.data.riskList[i].riskCode;
            this.checked = true;
            this.insuranceNum = data.data.riskList[i].amount;
            this.insuranceMoney = data.data.riskList[i].premium;
            this.insRegDate = data.data.riskList[i].startDate;
            //车船税
            for (var i = 0; i < this.payTaxList.length; i++) {
              if (this.payTaxList[i].code === data.data.tax.taxConditionCode) {
                this.taxConditionCode = this.payTaxList[i].code;
                this.payTax = this.payTaxList[i].text;
              }
            }
            //纳税地区代码
            for (var i = 0; i < this.taxLocationList.length; i++) {
              if (
                this.taxLocationList[i].code === data.data.tax.taxLocationCode
              ) {
                this.taxLocationCode = this.taxLocationList[i].code;
                this.taxLocation = this.taxLocationList[i].text;
              }
            }

            // 往年补缴
            this.sumTaxDefault = data.data.tax.sumTaxDefault;
            //滞纳金
            this.sumOverdue = data.data.tax.sumOverDue;
            //车船税合计
            this.shipNum = data.data.tax.sumTax;
            //完税凭证号码
            this.documentNumber = data.data.tax.documentNumber;
            //税务机关代码
            this.taxDepartmentCode = data.data.tax.taxDepartmentCode;
            //税务机关名称
            this.taxDepartment = data.data.tax.taxDepartment;
            //  完税凭证填发日期
            this.taxDocumentDate = data.data.tax.taxDocumentDate;
            //免税车型
            for (var i = 0; i < this.deductionDueTypeList.length; i++) {
              if (
                this.deductionDueList[i].code === data.data.tax.deductionDueCode
              ) {
                this.deductionDueCode = this.deductionDueList[i].code;
                this.deductionDue = this.deductionDueList[i].text;
              }
            }
            //减免方案
            for (var i = 0; i < this.deductionDueTypeList.length; i++) {
              if (
                this.deductionDueTypeList[i].code ===
                data.data.tax.deductionDueType
              ) {
                this.deductionDueType = this.deductionDueTypeList[i].code;
                this.deductionDueType = this.deductionDueList[i].text;
                //减免比例
                this.deductionDueProportion =
                  data.data.tax.deductionDueProportion;
              }
            }
          } else {
            this.busRiskCode = "0520";
            this.bussines = true;
            this.bussinesNum = data.data.riskList[i].premium;
            this.busRegisterDate = data.data.riskList[i].startDate;
            this.RegDate = data.data.riskList[i].endDate;
          }
        }
        //车辆损失险
        for (var i = 0; i < data.data.kindList.length; i++) {
          this.kindCode = data.data.kindList[i].kindCode;
          console.log("5468======");
          console.log(this.kindCode);
          // if (this.kindCode=== data.data.kindList[i].kindCode) {
          //   this.carChecked = data.data.kindList[i].notDeductibleFlag;
          //   this.carSwitch = true;
          if (this.kindCode === this.typesList[0].code) {
            console.log(
              "=========================================================================="
            );

            this.carChecked = data.data.kindList[i].notDeductibleFlag;
            this.carSwitch = true;
          } else if (this.kindCode === this.typesList[1].code) {
            this.secondChecked = true;
          }
          this.coveragePremium = data.data.kindList[i].coveragePremium;
          this.carAmount = data.data.kindList[i].amount;
          this.maxAmount = data.data.maxAmount;
          this.minAmount = data.data.minAmount;
          // }
        }
        //第三者责任险

        // 折扣
        this.saleDiscount = data.data.saleDiscount;
        //总保费
        this.totalPremium = data.data.sumPermium;
      } else {
        this.showIcon = false;
        this.$toast(data.message);
      }
    },

    confirmSaleDiscount() {
      if (
        this.Discount < this.lowestDiscount ||
        this.Discount > this.policyDiscount
      ) {
        return;
      }
      this.show = false;
      this.saleDiscount = this.Discount;
      // this.isActives = true;
      this.$refs.confirmSale.innerHTML = "重新算价";
      this.$refs.confirmSale.style.width = "150px";
      console.log(this.$refs.confirmSale.innerHTML);
    },
    // 确认报价
    async confimHandle() {
      if (this.$refs.confirmSale.innerHTML == "重新算价") {
        this.resetHandle();
        // this.$refs.confirmSale.innerHTML = "确认报价";
      } else {
        this.$router.push({
          path: "ConfirmInsured",
          query: {
            orderNo: this.orderNo
          }
        });
      }
    },
    cannelSale() {
      this.show = false;
    },
    // 选择器 共用
    choosePopup(list, name) {
      console.log(list, name);
      this.showPopup = true;
      this.columns = list;
      this.currentPicker = name;
    },
    // 确定选择
    confirmPicker(picker, values) {
      console.log(picker, values); //
      if (picker.text) {
        this[this.currentPicker] = picker.text;
      } else {
        this[this.currentPicker] = picker;
      }
      var bbb = (this[this.currentPicker.values] = values);
      // this.motorTypeCode = this.carList[values].code;
      console.log(bbb);
      this.showPopup = false;
      if (this[this.currentPicker] == "国产") {
        this.isShow = false;
      } else if (this[this.currentPicker] == "进口") {
        this.isShow = true;
      }
    },
    //显示注册日期
    dateShow(name) {
      this.showPopupDate = true;
      this.currentDateName = name;
      console.log(this.currentDateName);
    },
    dateShow2(name) {
      this.showPopupDate = true;
      this.currentDateName = name;
      console.log(this.currentDateName);
    },
    dateShow4(name) {
      this.showPopupDate5 = true;
      this.currentDateName = name;
      console.log(this.currentDateName);
    },
    dateShow3(name) {
      // this.registerDate = new Date();
      // console.log(name)
      console.log(this.registerDate);
      this.showPopupDate2 = true;
      // this.currentDateName = name;
      // console.log(this.currentDateName);
    },
    // 确定选择
    confirmDate(picker) {
      let date = dayjs(picker).format("YYYY-MM-DD HH");
      this[this.currentDateName] = date;
      console.log(date);
      console.log(this.currentDateName);
      this.showPopupDate = false;
      this.issueDate = dayjs(picker).format("YYYY-MM-DD");
    },
    //完税凭证填发日期
    confirmDate5(picker) {
      let date = dayjs(picker).format("YYYY-MM-DD HH");
      this[this.currentDateName] = date;
      this.showPopupDate5 = false;
      this.taxDocumentDate = dayjs(picker).format("YYYY-MM-DD");
    },
    // 初登日期确定选择
    confirmDate2(picker) {
      this.currentDate2 = new Date();
      this.currentDate2 = this[this.currentDateName];
      let date = dayjs(picker).format("YYYY-MM-DD");
      // this[this.currentDateName] = date;

      this.showPopupDate2 = false;
      this.registerDate = dayjs(picker).format("YYYY-MM-DD");
    }
  }
};
</script>
<style lang="scss" scope>
@import "/style/price.scss";
@import "/style/head.scss";
// .price {
//   margin-top: 53px;
// }
.fx {
  border: 1px solid #568efc !important;
  color: #568efc !important;
  // background: red;
}
.fxx {
  border: 1px solid #568efc !important;
  color: #568efc !important;
}
.border-no {
  .van-icon {
    float: right;
    right: 190px;
    bottom: 10px;
  }
}

.showIcon11 {
  width: 170px;
  height: 110px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  // opacity: 0.6;
  text-align: center;
  img {
    width: 35px;
    height: 35px;
    padding-top: 23px;
    padding-bottom: 6px;
  }
  p {
    color: #fff;
    font-size: 16px;
  }
}
.carPai {
  .van-cell__value {
    overflow: auto !important;
  }
}
#loanCar,
#AddloanCar {
  .van-cell__title {
    flex: 88% 0 !important;
    font-size: 12px;
    color: #568efc;
  }
}
.contributing {
  .van-button {
    width: 100%;
    border-radius: 8px;
  }
  padding: 20px;
  .top {
    padding-bottom: 40px;
    font-size: 18px;
    .van-icon {
      float: right;
    }
  }
  .content {
    .title {
      margin-bottom: 15px;
    }
    .child {
      padding-left: 15px;
      padding-bottom: 10px;
    }
  }
}
#AddloanCar {
  color: #568efc;
  font-size: 12px;
  padding: 0 0 15px 13px;
}
.child {
  input {
    border: 1px solid rgb(153, 151, 151);
    width: 100%;
    height: 25px;
    padding: 0 15px;
    border-radius: 5px;
  }
}
.carNumber {
  .van-cell__value {
    padding-top: 0 !important;
  }
  .van-icon {
    margin-right: 15px !important;
  }
}
.spiritInput {
  float: right;
  width: 70px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid #ccc !important;
  margin-top: 10px;
  padding: 3px 5px;
  box-sizing: border-box;
}
</style>