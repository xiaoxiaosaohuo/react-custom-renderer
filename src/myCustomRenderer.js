import ReactReconciler from 'react-reconciler';
const rootHostContext = {};
const childHostContext = {};
const hostConfig = {
    getRootHostContext: () => {
      console.log('getRootHostContext');
      return rootHostContext;
    },
    getChildHostContext: () => {
      console.log('getChildHostContext');
      return childHostContext;
    },
    shouldSetTextContent: (type,props) => {
      console.log('shouldSetTextContent')
      return typeof props.children === 'string' || typeof props.children === 'number';
    },
    createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
      console.log('createInstance')
      const domElement = document.createElement(type);
      Object.keys(newProps).forEach(propName => {
        const propValue = newProps[propName];
        if (propName === 'children') {
          if (typeof propValue === 'string' || typeof propValue === 'number') {
            domElement.textContent = propValue;
          }
        } else if (propName === 'onClick') {
          domElement.addEventListener('click', propValue);
        } else if (propName === 'className') {
          domElement.setAttribute('class', propValue);
        } else {
          const propValue = newProps[propName];
          domElement.setAttribute(propName, propValue);
        }
      });
      return domElement;
    },
    createTextInstance: (text) => {
      console.log('createTextInstance')
      return document.createTextNode(text);
    },
    appendInitialChild: (parent,child) => {
      console.log('appendInitialChild',child)
      parent.appendChild(child);
    },
    appendChild(parent, child) {
      console.log('appendChild')
      parent.appendChild(child);
    },
    finalizeInitialChildren: (domElement, type, props) => {
      console.log('finalizeInitialChildren')
      return {}
    },
    prepareForCommit: () => {
      console.log('prepareForCommit')
    },
    resetAfterCommit: () => {
      console.log('resetAfterCommit')
    },
    supportsMutation:true,
    appendAllChildren:()=>{
      console.log('appendAllChildren')
     },
    appendChildToContainer:(parent,child)=>{
      console.log('appendChildToContainer')
      parent.appendChild(child)
    },
    prepareUpdate(domElement, oldProps, newProps) {
      console.log('prepareUpdate')
      return true;
    },
    commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
      console.log('commitUpdate')
      Object.keys(newProps).forEach(propName => {
        const propValue = newProps[propName];
        if (propName === 'children') {
          if (typeof propValue === 'string' || typeof propValue === 'number') {
            domElement.textContent = propValue;
          }
        } else {
          const propValue = newProps[propName];
          domElement.setAttribute(propName, propValue);
        }
      });
    },
    commitTextUpdate(textInstance, oldText, newText) {
      console.log('commitTextUpdate')
      textInstance.text = newText;
    },
    removeChild(parentInstance, child) {
      console.log('removeChild')
      parentInstance.removeChild(child);
    },
    commitMount:()=>{
      console.log('commitMount')
    }
};
const ReactReconcilerInst = ReactReconciler(hostConfig);
export default {
  render: (reactElement, domElement, callback) => {
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
  }
};