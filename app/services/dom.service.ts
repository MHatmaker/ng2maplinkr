import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef,
    ComponentRef
} from '@angular/core';


@Injectable()
export class DomService {
  private id : number;
  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private appRef: ApplicationRef,
      private injector: Injector
  ) { }

  appendComponentToBody(component: any, id: number) {
    this.id = id;
    console.log("appendCompenent with id" + this.id);
    // Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.body.appendChild(domElem);

    // Wait some time and remove it from the component tree and from the DOM
    //setTimeout(() => {
    //    this.appRef.detachView(componentRef.hostView);
    //    componentRef.destroy();
    //}, 3000);
  }
  getId() {
      return this.id;
  }


}
