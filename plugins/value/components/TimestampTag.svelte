<svelte:options immutable={true} />

<script>import Icon from 'svelte-awesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { getContext } from 'svelte';
import { tooltip } from '../../../components/controls/tooltip/tooltip';
const absolutePopupContext = getContext('absolute-popup');
export let value;
$: text = `Time: ${new Date(value).toString()}`;
</script>

<div class="jse-timestamp" use:tooltip={{ text, ...absolutePopupContext }}>
  <Icon data={faClock} />
</div>

<style src="./TimestampTag.scss">.jse-timestamp {
  padding: 0;
  margin: 0;
  height: var(--jse-line-height);
  color: var(--jse-value-color-number);
  border-radius: 3px;
}</style>
