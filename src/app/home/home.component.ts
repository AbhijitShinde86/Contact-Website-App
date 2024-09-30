import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private saveSub: Subscription;
  private dataSub: Subscription;
  private deleteSub: Subscription;

  isLoading = false; homeText: string;searchText:string=''; 
  dtData = []; searchData = []; pageData: any[]; pager: any = { pages : 0 };
  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  modalDisplayVal = 'none'; modalTitle = ''; modalForm: FormGroup; submitted = false; 
  get mForm() { return this.modalForm.controls; }  

  constructor(private contactService:ContactService, private formBuilder: FormBuilder,
    private paginationService:PaginationService, 
  ) { 
    this.initializeForm(); this.getData();
  }

  ngOnInit(): void {
    this.homeText = "WELCOME TO CONTACTS MANAGEMENT APPLICATION";
  }
  
  onSave(){
    this.submitted = true;
    if (!this.modalForm.valid) {
      return;
    }
    const data = {
      id: this.modalForm.value.id,
      firstName: this.modalForm.value.firstName,
      lastName: this.modalForm.value.lastName,
      email: this.modalForm.value.email
    };

    if(confirm("Are you sure to save record?")) {
      this.showLoading();
      let action = this.contactService.addItem(data);
      if(this.modalForm.value.id)
        action = this.contactService.updateItem(this.modalForm.value.id, data);

      this.saveSub = action.subscribe(
        resData => {
          //console.log(resData);
          this.hideModal()
          this.hideLoading();
          alert("Record saved successfully");
          this.getData();
        },
        errorMessage => { this.showError(errorMessage); }       
      );
    }
  }

  onAddClick(){
    this.loadModal({});
  }  

  onEditClick(record:any){
    const data = {
      id: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email
    };

    this.loadModal(data);
  }  

  onDeleteClick(id : string){
    if(confirm("Are you sure to delete record?")) {
      this.showLoading();
      this.deleteSub = this.contactService.deleteItem(id).subscribe(
        resData => {
          //console.log(resData);
            this.hideLoading();
            alert("Record deleted successfully");
            this.getData();
        },
        errorMessage => { this.showError(errorMessage); }            
      );
    }
  }

  getData(){
    this.showLoading();
    this.dataSub = this.contactService.getList().subscribe(
      resData => {        
        this.loadData(resData);
        this.hideLoading();
      },
      errorMessage => { this.showError(errorMessage); }
    )
  }
  
  //#region Common Section
    loadData(data:any){
      // console.log("data : ", data);
      this.dtData = data;
      this.searchData = data;
      this.setPage(1);
    }

    showLoading(){
      this.isLoading = true; 
      //.. spinner start logic
    }

    hideLoading(){
      this.isLoading = false;
      //.. spinner end logic
    }

    showError(errorMessage){
      this.hideLoading(); 
      alert(errorMessage);
    }

    onSearchClick(): void {
      this.searchData = this.dtData;
      
      if(this.searchText && this.searchText !== ''){
        this.searchData = this.searchData.filter(data => {
          return data.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          data.lastName.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }

      this.setPage(1);
    }
    
    setPage(page: number) {
      this.pager = this.paginationService.getPager(this.searchData.length, page);
      this.pageData = this.searchData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    } 
    
    loadModal(data:any){      
      this.submitted = false;   
      this.modalForm.reset(data);
      this.modalTitle = JSON.stringify(data) === "{}" ? "Create Contact" : "Edit Contact";
      this.modalDisplayVal = 'block';
    }

    hideModal(){      
      this.submitted = false;   
      this.modalForm.reset();
      this.modalTitle = "";
      this.modalDisplayVal = 'none';
    }

    initializeForm(){
      this.modalForm = this.formBuilder.group({
        id: [''],
        firstName: ['', Validators.required], 
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      });
    }
    
  //#endregion
  
  ngOnDestroy(): void {
    if(this.saveSub){
      this.saveSub.unsubscribe();
    }
    if(this.dataSub){
      this.dataSub.unsubscribe();
    }
    if(this.deleteSub){
      this.deleteSub.unsubscribe();
    }
  }
}
