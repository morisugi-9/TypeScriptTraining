abstract class Department {
    // private id: string;
    // private name: string;
    protected employee: string[] = [];

    // constructor(id: string, n: string) {
    //     this.id = id;
    //     this.name = n;
    // }
    //shortcut
    // readonly typescript only
    constructor(protected readonly id: string, public name: string) {

    }

    abstract describle(this: Department) : void

    addEmployee(employee: string) {
        this.employee.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employee);
    }
}

// const accounting = new Department('d1','Accounting');
// console.log(accounting);

// accounting.describle();

// accounting.addEmployee('Max');
// accounting.addEmployee('Manu');

// error 
// const accountCopy = { name: 'DUMMY', describe: accounting.describle};
// accountCopy.describe();

class ITDepartment extends Department {
    constructor(id: string, private admins: string[]) {
        super(id, 'IT');
    }
    describle(this: Department): void {
        console.log(`describe: id:${super.id} name:${this.name}`);
    }
}

const itDepartment = new ITDepartment('d2',['Max']);
console.log(itDepartment);

// singleton
class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('レポートが見つかりません。');
    }
    set mostRecentReport(value: string) {
        this.lastReport = value;
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        return new AccountingDepartment('d3', []);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    addEmployee(employee: string): void {
        if (employee === 'Max') {
            console.log(`${employee} is Administrator`)
            return;
        }
        this.employee.push(employee);
    }
    describle(this: Department): void {
        console.log(`describe: id:${super.id} name:${this.name}`);
    }


}

// const accountingDepartment = new AccountingDepartment('d3', []);
const accountingDepartment = AccountingDepartment.getInstance();
accountingDepartment.addReport('Something');
accountingDepartment.printReports();
accountingDepartment.addEmployee('Max');
accountingDepartment.addEmployee('Manu');
accountingDepartment.printEmployeeInformation();