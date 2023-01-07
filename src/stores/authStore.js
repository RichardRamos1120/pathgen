import { writable } from 'svelte/store';

const isLoggedIn = writable(false);
const firstVisible = writable(true);
const makeItVisibleFirst = writable(()=>{
	if($firstVisible){
		return "visible-flex";
		firstVisible.update(false)
	}
	return "";
})

export { isLoggedIn,makeItVisibleFirst, firstVisible}