import { $ } from "../../core/dom";
import { Observer } from "../../core/Observer";
import { lastUpdateChange } from "../../store/actionCreators";
import { StoreSubscriber } from "../../store/StoreSubscriber";

export class Excel {
  constructor( options) {
    this.components = options.components || [];
		this.store = options.store;
		this.observer = new Observer();
		this.storeSubscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
		const componentOptions = {
			observer: this.observer,
			store: this.store
		};

		const $root = $.create('div', 'excel');
    
		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions);
      $el.html(component.toHtml())
			$root.append($el)
			return component;
    });
    return $root;
  }
	
  init() {
		this.store.dispatch(lastUpdateChange())
		this.storeSubscriber.subscribeComponents(this.components)
		this.components.forEach(component => component.init())
	}



	destroy(){
		this.storeSubscriber.unsubscribeFromStore();
		this.components.forEach(component => component.destroy());
	}
}
