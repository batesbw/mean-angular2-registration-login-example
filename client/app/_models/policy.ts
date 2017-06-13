export class Policy {
    _id: string;
    coverType: string;
    policyNumber: number;
    contractValue: number;
    addressLine1: string;
    addressLine2: string;
    state: string;
    postCode: string;
    riskRating: string
    issueDate: string;

    constructor(
        coverType: string, 
        policyNumber: number, 
        contractValue: number, 
        addressLine1: string, 
        addressLine2: string,    
        state: string,
        postCode: string,
        riskRating: string,
        issueDate: string) {
            this.coverType = coverType;
            this.policyNumber = policyNumber;
            this.contractValue = contractValue;
            this.addressLine1 = addressLine1;
            this.addressLine2 = addressLine2;
            this.state = state;
            this.postCode = postCode;
            this.riskRating = riskRating;
            this.issueDate = issueDate;            
                
    }

}