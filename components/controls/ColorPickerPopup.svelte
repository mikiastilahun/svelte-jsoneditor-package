<script>import { onDestroy, onMount } from 'svelte';
export let color;
export let onChange;
export let showOnTop;
let ref;
let colorPicker;
onMount(async () => {
    // Dynamically import VanillaPicker, because it requires `document` to be defined,
    // and that is not supported server side
    const VanillaPicker = (await import('vanilla-picker')).default;
    colorPicker = new VanillaPicker({
        parent: ref,
        color,
        popup: showOnTop ? 'top' : 'bottom',
        onDone: function (color) {
            const alpha = color.rgba[3];
            const hex = alpha === 1
                ? color.hex.substring(0, 7) // return #RRGGBB
                : color.hex; // return #RRGGBBAA
            onChange(hex);
        }
    });
    colorPicker.show();
});
onDestroy(() => {
    if (colorPicker) {
        colorPicker.destroy();
    }
});
</script>

<div class="jse-color-picker-popup" bind:this={ref} />

<style src="./ColorPickerPopup.scss">.jse-color-picker-popup :global(.picker_wrapper.popup),
.jse-color-picker-popup :global(.picker_wrapper.popup .picker_arrow::before),
.jse-color-picker-popup :global(.picker_wrapper.popup .picker_arrow::after) {
  background: var(--jse-color-picker-background);
  line-height: normal;
}
.jse-color-picker-popup :global(.picker_slider),
.jse-color-picker-popup :global(.picker_sl),
.jse-color-picker-popup :global(.picker_editor input),
.jse-color-picker-popup :global(.picker_sample),
.jse-color-picker-popup :global(.picker_done button) {
  box-shadow: var(--jse-color-picker-border-box-shadow);
}
.jse-color-picker-popup :global(.picker_editor input) {
  background: var(--jse-background-color);
  color: var(--jse-text-color);
}
.jse-color-picker-popup :global(.picker_done button) {
  background: var(--jse-button-background);
  color: var(--jse-button-color);
}
.jse-color-picker-popup :global(.picker_done button:hover) {
  background: var(--jse-button-background-highlight);
}</style>
