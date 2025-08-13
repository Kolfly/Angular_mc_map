import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar implements OnInit {

  search!: string

  ngOnInit(): void {
    
  }
}

