<template>

    <div>
        <btns @label="label"></btns>
        <Table :columns="columns" :select="select" :top_btn="top_btn" :act_btn="act_btn" :replace="replace"
            @onButtonClick="onButtonClick">
        </Table>
        <!-- 搜索 -->
        <searchs :visiable="content.visiable" @search_ts="search_one" @colsed="colsed">
        </searchs>


        <CommitDialog :visiable="commitDialogData.visiable" :paramData="commitDialogData.paramData"
            @close="closeCommitDialog" @commitMethod="executeDindDingInterface"></CommitDialog>
        <add :cons='cons_flte'>
            <instructions :instructions_cons_sop='instructions_cons' />
        </add>

    </div>
</template>
<script>
    import Table from "@/components/viewcomp/Table";
    import searchs from "@/components/search/index";
    // Finance
    import add from '@/components/add/add'
    import instructions from './item/sop_item' //指导书的内容
    import btns from "@/components/btnselect/index"; //状态按钮
    import { selectSopImgByPkProduct, selectSopEditionByPkProduct, selectAllBdPsndocAsRef, saveSopTask, selectSopTaskByPkPsndoc, selectAllSopTask, saveSopEdition } from "@/api/sop/book"; //主表的路径
    import {
        selectAllOrderPlanAsPage,
    } from "@/api/orderCompMage/OrderPlan";
    import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
    import CommitDialog from "@/components/Commitdingding/CommitDialog";//钉钉
    export default {
        components: { Table, searchs, add, instructions, btns, CommitDialog },


        data() {
            return {
                cons_flte: {},

                instructions_cons: {},//审核的数据
                // title:'',

                commitDialogData: {
                    // 控制钉钉Dialog显示
                    visiable: false,
                    paramData: null,
                },

                imglists: [],
                imgsrc: null,//缩略图的src路径

                checkedCities: null,
                visibles: false,
                content: {
                    visiable: false, // 内容界面显示控制
                    title: "", // 标题
                    action: null, // 执行Action
                    updateRow: null, // 更新时带过来的temp
                },
                columns: [
                    { prop: "productCode", label: "产品编码", width: "100" },
                    { prop: "productName", label: "产品名称", width: "100" },
                    { prop: "isDefault", label: "是否默认", width: "110" },
                    // { prop: "orderSignTime", label: "签订日期", width: "100" },
                    { prop: "creationtime", label: "创建时间", width: "100" },
                    { prop: "editionNum", label: "审核状态", width: "100" },
                    { prop: "creatorShow", label: "创建人", width: "100" },


                ],
                jsons:null,//提交接口
                pkProductOrderB: null,//客户的id
                boxckeck: [],//提交的字符串前的存储数组
                boxdatas: '',//提交的字符串

                pkSopTask: null,

                select: {
                    select: selectSopEditionByPkProduct,
                    queryParam: { editionState: 1 },
                },

                top_btn: [
                    {
                        name: "搜索",
                        code: "ADD",
                        // action: addSmMenu,
                    },

                ],
                act_btn: [

                    {
                        name: "",
                        code: "FILEDETAILS2",
                        action: null,
                        typeLess: "itag",
                        iconPic: "el-icon-s-management",
                        btnSize: "mini",
                    },
                    // {
                    //     name: "",
                    //     code: "FILEDETAILS3",
                    //     action: null,
                    //     typeLess: "itag",
                    //     iconPic: "el-icon-view",
                    //     btnSize: "mini",
                    // },
                    {
                        name: "",
                        code: "FILEDETAILS4",
                        action: null,
                        typeLess: "itag",
                        when: { editionState: [1] },
                        iconPic: "el-icon-check",
                        btnSize: "mini",
                    },
                    {
                        name: "",
                        code: "FILEDETAILS5",
                        action: null,
                        typeLess: "itag",
                        when: { editionState: [1] },
                        iconPic: "el-icon-close",
                        btnSize: "mini",
                    },
                ],
                ressl: { editionState: 1 },
                replace: [
                    {
                        name: "isDefault",
                        replace: {
                            0: "是",
                            1: "否",

                        },
                    },
                    {
                        name: "editionState",
                        replace: {
                            0: "自由态",
                            1: "进行中",
                            2: "进行通过"
                        },
                    },
                ],
            };
        },

        methods: {
            // handleCheckedCitiesChange(value) {
            //     // console.log(value);
            //     // this.imglists.push(value)
            //     console.log(this.imglists.includes(value));
            //     // if(this.boxckeck.includes(value) ){

            //     // }
            //     // this.boxckeck.push(value)

            // },
            label(data) {
                //判断审批是否通过
                this.ressl = data;
                let newSelect = { select: this.select.select, queryParam: data };
                this.select = newSelect;
            },
            onButtonClick(param) {
                //点击搜索
                if (param.btnCode === "ADD") {
                    this.content.visiable = true;
                }
                // 工艺表单

                if (param.btnCode === "FILEDETAILS4") {
                    //审批通过
                        this.jsons = {
                            pkSopEdition: param.bindData.pkSopEdition,
                            editionState: 2
                        }
                        this.commitDialogData.visiable = true;
                }
                if (param.btnCode === "FILEDETAILS5") {
                    //审批驳回
                        this.jsons = {
                            pkSopEdition: param.bindData.pkSopEdition,
                            editionState: 0
                        }
                    this.commitDialogData.visiable = true;

                }
                if (param.btnCode === "FILEDETAILS2") {
                    this.instructions_cons = param.bindData

                    this.cons_flte = {
                        contentVisiable: true,
                        title: null,
                    }
                }
            },
            colsed(data) {
                // 弹窗的显示隐藏
                this.content.visiable = data;
            },
            closeCommitDialog() {
                this.commitDialogData.visiable = false;
            },

            closes() {
                this.visibles = false
            },
            // selectAllSopTask
            executeDindDingInterface(sendMsgParam) {
                // let jsons = this.jsons

                // 调用钉钉接口   sendMsgParam的数据提交进去
                sendDingMsgByPsndoc(sendMsgParam).then((response) => {
                    
                    // 钉钉接口的毁掉
                    if (response && response.data.success) {
                        // 调用接口后处理
                        alert("调用钉钉接口成功");
                        console.log(this.jsons);
                        saveSopEdition(this.jsons).then((res) => {
                            this.label(this.ressl)
                        })

                    } else {
                        alert("调用钉钉接口失败");
                    }
                });
            },
            //搜索接口
            search_one(data) {
                this.content.visiable = false;
                // console.log(data);
                let mindata = {
                    creationdateBegin: data['开始时间'],
                    creationdateEnd: data['结束时间'],
                    contractNo: data['合同编号'],
                };
                this.select = {
                    select: selectAllIfinancialInfoAsPage,
                    queryParam: mindata,
                };
            },
        },
    };
</script>
<style lang="scss" type="text/scss" scoped>

</style>