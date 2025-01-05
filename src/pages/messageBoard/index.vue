<template>
    <div class="board_container">
        <el-card style="max-width: 100%">
            <p v-for="mes in messages">{{ mes.message }}
            <p></p>
            <p>---------------------------------------------------------------------------</p>
            </p>
        </el-card>
    </div>
</template>

<script lang="ts" name="" setup>
    import { ref, reactive } from 'vue'
    import { } from 'vue-router'
    import { getBoardMessage } from '@/api/messageBoard';
    import { onMounted } from 'vue';

    let messages = reactive({})
    // let messages = ref({})

    onMounted(async () => {
        let res = await getBoardMessage()
        console.log(res.data.messageData)
        // messages.value = res.data.messageData
        Object.assign(messages,res.data.messageData)
    })

</script>

<style lang="scss" scoped>
    .board_container {
        p {
            margin-top: 15px;
        }
    }
</style>