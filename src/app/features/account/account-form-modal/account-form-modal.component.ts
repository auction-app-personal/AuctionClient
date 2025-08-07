import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AccountDto, AccountRole, Gender } from '../../../models/account/account.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ACCOUNT_SERVICE } from '../../../services/common/injection-tokens';
import { AccountService } from '../../../services/data/account/account-service.interface';

@Component({
  selector: 'app-account-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-form-modal.component.html',
  styleUrl: './account-form-modal.component.scss'
})
export class AccountFormModalComponent {

  @Input({required: true}) account: AccountDto | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();


  accountForm!: FormGroup;

  constructor(@Inject(ACCOUNT_SERVICE) private accountService: AccountService,
              private fb: FormBuilder){

  }
  
  ngOnInit(): void {
    this.accountForm = this.fb.group({
      name: [this.account?.name ?? '', Validators.required],
      surname: [this.account?.surname ?? '', Validators.required],
      email: [this.account?.email ?? '', Validators.email],
      birthday: [this.account?.dob ?? null],
      gender: [this.account?.gender ?? null] 
    });
  }

  saveLot(): void {
    this.accountService.save({
      id: this.account?.id ?? 0,
      username: this.account?.username ?? '',
      name: this.accountForm.get("name")?.value,
      surname: this.accountForm.get("surname")?.value,
      email: this.accountForm.get("email")?.value,
      dob: this.accountForm.get("birthday")?.value,
      gender: this.accountForm.get("gender")?.value ?? Gender.OTHER,
      role: this.account?.role ?? AccountRole.USER
    }).subscribe(
      (value) => {
        if(value.id === 0){
          console.log('fail')
          return;
        }
        this.save.emit();
        this.close.emit();
      }
    );
  }

  closeModal(): void {
    this.close.emit();
  }
}
