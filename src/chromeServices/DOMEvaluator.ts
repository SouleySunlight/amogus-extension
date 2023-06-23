import { createHash } from "crypto";
import { DOMMessage, DOMMessageResponse } from "../types/DOMMessages";
import { hash } from "../utils";

 
// Function called when a new message is received
export const messagesFromReactAppListener = (
   msg: DOMMessage,
   sender: chrome.runtime.MessageSender,
   sendResponse: (response: DOMMessageResponse) => void) => {
  
 
   const allTds = Array.from(document.getElementsByTagName<"td">("td"))
    
   const additionLineTds = allTds.filter((allTds)=>{
       const tdClassnames = allTds.className.split(' ')
       return tdClassnames.includes('blob-code-addition')
   })

   const additionLineTdsText = additionLineTds.map(td => td.innerText)

   const addedCode = additionLineTdsText.reduce((accumulator, currentValue) => accumulator + currentValue, "")



    

    // Prepare the response object with information about the site
   const response: DOMMessageResponse = {
       title: document.title,
       addedCode: addedCode
   };
 
   sendResponse(response);
}
 
/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);