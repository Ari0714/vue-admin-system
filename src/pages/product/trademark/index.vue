<template>
    <div class="">
        <el-card>
            <el-button type="primary" :icon="Plus">add brand</el-button>
            <el-table :data="datas" style="width: 100%; margin: 10px 0px;" border>
                <el-table-column prop="date" label="Id" width="50px" type="index" />
                <el-table-column prop="brandName" label="BrandName" />
                <el-table-column label="Logo">
                    <template #="{ row, $index }">
                        <img :src="row.picUrl" style="width:100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="Operation">
                    <el-button type="primary" size="small" :icon="Edit" style="background-color: burlywood">Edit</el-button>
                    <el-button type="primary" size="small" :icon="Delete" style="background-color: red;">Delete</el-button>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="current_page" v-model:page-size="page_size" :page-sizes="[3, 5, 7, 9]"
                :size="size" :disabled="disabled" :background="background"
                layout="prev, pager, next, jumper, ->,  total, sizes" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script lang="ts" name="" setup>
    import { ref } from 'vue'
    import { } from 'vue-router'
    import { Plus, Edit, Delete } from '@element-plus/icons-vue'
    import { getBrandData } from '@/api/product/trademark'
    import { onMounted } from 'vue'

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
    async function handleSizeChange (){
        current_page.value = 1
        handleCurrentChange()
    }



</script>

<style lang="scss" scoped></style>