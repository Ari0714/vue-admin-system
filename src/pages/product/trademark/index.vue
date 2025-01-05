<template>
    <div class="">
        <el-card>
            <el-button type="primary" :icon="Plus" @click="handleAdd">add brand</el-button>
            <el-table :data="datas" style="width: 100%; margin: 10px 0px;" border>
                <el-table-column prop="date" label="Id" width="50px" type="index" />
                <el-table-column prop="brandName" label="BrandName" />
                <el-table-column label="Logo">
                    <template #="{ row, $index }">
                        <img :src="row.picUrl" style="width:100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="Operation">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" :icon="Edit" style="background-color: burlywood"
                            @click="handleEdit(row)">Edit</el-button>
                        <el-popconfirm title="Are you sure to delete this?" width="250px" @confirm="handleDelete(row)">
                            <template #reference>
                                <el-button type="primary" size="small" :icon="Delete" style="background-color: red;"
                                    @click="">Delete</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="current_page" v-model:page-size="page_size" :page-sizes="[3, 5, 7, 9]"
                :size="size" :disabled="disabled" :background="background"
                layout="prev, pager, next, jumper, ->,  total, sizes" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>


        <!-- add/update dialog -->
        <el-dialog v-model="dialogFormVisible" :title="addBrandSymbol" width="500">

            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="brandNane" label-width="100px" label-position="left" prop="xxx">
                    <el-input placeholder="" v-model="uploadFileR.brandName"></el-input>
                </el-form-item>
                <el-form-item label="LOGO" label-width="100px" label-position="left" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/myapi/uploadImg" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="uploadFileR.imgUrl" :src="uploadFileR.imgUrl" class="" width="200px"
                            height="200px" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleCancal">Cancel</el-button>
                    <el-button type="primary" @click="handleConfirm">Confirm</el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" name="" setup>
    import { ref, reactive } from 'vue'
    import { } from 'vue-router'
    import { Plus, Edit, Delete } from '@element-plus/icons-vue'
    import { getBrandData } from '@/api/product/trademark'
    import { onMounted } from 'vue'
    import { type UploadProps, ElMessage } from 'element-plus'
    import { uploadBrandData, editBrandData, delBrandData } from '@/api/product/trademark'


    let current_page = ref(1)
    let page_size = ref(3)
    let total = ref(1)
    let datas = ref<any>([]);
    onMounted(async () => {
        // must add async/await can show datax123.xxx.xxx
        let datax123 = await getBrandData({ currentPage: current_page.value, pageSize: page_size.value })
        datas.value = datax123.data.tableData
        total.value = datax123.data.total
    })

    async function handleCurrentChange() {
        let datax = await getBrandData({ currentPage: current_page.value, pageSize: page_size.value })
        console.log('datas', datas)
        datas.value = datax.data.tableData
    }
    async function handleSizeChange() {
        current_page.value = 1
        handleCurrentChange()
    }

    /**
     * diallog
     */
    let dialogFormVisible = ref(false)
    let addBrandSymbol = ref('add brand')
    let uploadFileR = reactive({ file: '', brandName: '', brandId: '', imgName: '', imgUrl: '' })
    function handleAdd() {
        dialogFormVisible.value = true
    }
    // edit
    async function handleEdit(row: any) {
        addBrandSymbol.value = 'edit brand'
        uploadFileR.brandId = row.brandId
        uploadFileR.brandName = row.brandName
        uploadFileR.imgUrl = row.picUrl
        dialogFormVisible.value = true
    }
    // del
    async function handleDelete(row: any) {
        let res = await delBrandData(row)
        console.log('res:', res)
        if (res.code == 200) {
            ElMessage.success('del success')
            handleCurrentChange()
            handleSizeChange()
        } else {
            ElMessage.success('del fail')
        }

    }
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
            ElMessage.error('Avatar picture must be jpg|png|gif format!')
            return false
        } else if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage.error('Avatar picture size can not exceed 4MB!')
            return false
        }
        return true
    }
    const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
        // uploadFile.value = URL.createObjectURL(uploadFile.raw!)
        uploadFileR.imgUrl = response.url
        ElMessage.success('succeed upload')
    }

    //todo
    async function handleCancal() {
        dialogFormVisible.value = false
        // let upload =  await uploadBrandData(uploadFileR)
        // console.log('upload: ',upload)
        // let datax123 = await getBrandData({ currentPage: current_page.value, pageSize: page_size.value })
        // datas.value = datax123.data.tableData
        // total.value = datax123.data.total
        uploadFileR.imgUrl = ''
        uploadFileR.imgName = ''
        // ElMessage.success('add cancel')

    }
    async function handleConfirm() {
        uploadFileR.imgUrl = ''
        uploadFileR.imgName = ''
        // ElMessage.success('add success')

        //update
        let res = await editBrandData(uploadFileR)
        console.log('res: ', res)
        if (res.code == 200) {
            ElMessage.success('edit success')
        } else {
            ElMessage.success('edit fail')
        }
        handleCurrentChange()
        handleSizeChange()
        dialogFormVisible.value = false
    }

    //表单校验规则对象
    //1. 品牌自定义校验规则方法
    const validatorTmName = (rule: any, value: any, callBack: any) => {
        console.log('value:', value)
        //是当表单元素触发blur时候,会触发此方法
        //自定义校验规则
        if (value.trim().length >= 2) {
            callBack();
        } else {
            //校验未通过返回的错误的提示信息
            callBack(new Error('品牌名称位数大于等于两位'))
        }
    }
    //2. 品牌LOGO图片的自定义校验规则方法
    // const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    //     //如果图片上传
    //     if (value) {
    //         callBack();
    //     } else {
    //         callBack(new Error('LOGO图片务必上传'))
    //     }
    // }
    // 3. define
    const rules = {
        xxx: [
            //required:这个字段务必校验,表单项前面出来五角星
            //trigger:代表触发校验规则时机[blur、change]
            { required: true, trigger: 'blur', validator: validatorTmName }
        ],
        logoUrl: [
            // { required: true, validator: null }
        ]
    }


</script>

<style lang="scss" scoped>
    avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }

</style>