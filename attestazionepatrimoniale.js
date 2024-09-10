import { LightningElement, track } from 'lwc';
import isAccountAvailable from '@salesforce/apex/AttestazionePatrimonialeCompController.isAccountAvailable';
import LightningAlert from 'lightning/alert';
export default class AttestazionePatrimonialeComp extends LightningElement {
    @track accountId = '';

    @track isLoading = false;

    handleInputChange(event) {

        this.accountId = event.target.value;
    }

    handleDownload() {
         this.isLoading = true;
        if (this.accountId == '') {
            console.log('empty');

            LightningAlert.open({
                message: 'Il campo non può essere vuoto',
                theme: 'error', // a red theme intended for error states
                label: 'Error!', // this is the header text
            });
            this.isLoading = false;
            return;

        }
        isAccountAvailable({ keyId: this.accountId })
            .then(result => {
                if (result) {
                    console.log(result);
                    // Account exists, open the VF page to generate and download the PDF
                    window.open('/apex/AttestazionePatrimonialePDF?id=' + this.accountId);
                     this.isLoading = false;
                } else {
                    this.isLoading = false;
                    // Account does not exist, show an error message
                    LightningAlert.open({
                        message: "L'NDG che stai cercando non è stato trovato.",
                        theme: 'error', // a red theme intended for error states
                        label: 'Error!', // this is the header text
                    });

                }
            })
            .catch(error => {
                // Handle any errors from the Apex call
                LightningAlert.open({
                    message: "Si è verificato un errore, contatta l'amministratore di piattaforma",
                    theme: 'error', // a red theme intended for error states
                    label: 'Error!', // this is the header text
                });
                this.isLoading = false;

                console.error('Error:', error);
            });
    }


}
