<template>
    <li>
        <div
            :class="{ 'font-weight-bold': isFolder }"
            class="d-inline"
            @click="toggle">
            <span v-if="isFolder">
                <i v-if="isOpen" class="fal fa-minus pr-2"></i>
                <i v-else class="fal fa-plus pr-2"></i>
            </span>
            <span v-if="!isFolder">
                <i class="fal fa-cogs pr-2"></i>
            </span>
            <span v-html="item.name"></span>
        </div>
        <i
            class="fal fa-trash-alt pl-2 text-danger d-inline cursor-pointer"
            v-if="(item.numpat || item.IdRegional > -1 || item.IdRol) && !seGraboPermisos"
            @click="deleteItem(item)"></i>

        <ul
            v-show="isOpen"
            v-if="isFolder"
            style="list-style-type:none;line-height:1.8em;">
            <tree-item-component
                v-for="(child, index) in item.children"
                :key="index"
                :item="child"
                :seGrabo="seGraboPermisos"
                @delete-item="deleteItem($event);" />
        </ul>
    </li>
</template>
<script lang='ts'>
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        item: {
            type: Object,
            required: true
        },
        seGrabo: {
            type: Boolean,
            required: true
        }
    },
    setup(props, { emit }) {
        const isOpen = ref<boolean>(true);

        const isFolder = computed(() => {
            return props.item.children && props.item.children.length;
        });

        const seGraboPermisos = computed(() => {
            return props.seGrabo;
        });

        const toggle = () => {
            if (isFolder.value) {
                isOpen.value = !isOpen.value;
            }
        }

        const deleteItem = (item: any) => {
            emit('delete-item', item);
        }

        return {
            isOpen,
            isFolder,
            seGraboPermisos,

            toggle,
            deleteItem,
        };
    }
});
</script>