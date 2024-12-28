import productsData from './products-data.js';

export function cardAnimationOccured(id) {
	let selectedProductName = selectedProductKeyName(id);
	
    return localStorage.getItem(selectedProductName);
}

export function checkIfKeyExistsInLocalStorage(keyName) {
	let result = localStorage.getItem(keyName);
	if(result === null) return false;
	return true;
}

export function selectedProductKeyName(id) {
	return `product_selected_${id}`
}

export function getProductSelectedById() {
	return localStorage.getItem("item_ID");
}

export function getRegisteredProductList() {	
	let registeredProductList = [];

	for(let item of productsData) {
		let keyName = selectedProductKeyName(item.id);

		let result = checkIfKeyExistsInLocalStorage(keyName);

		if(result === true) {
			registeredProductList.push(item);
		}
	}
	console.log(registeredProductList);
	return registeredProductList;
}