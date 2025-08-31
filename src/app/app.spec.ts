import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { SearchBar } from './search-bar/search-bar';
import { MapComponent } from './map/map';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render search bar and map components', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-search-bar')).toBeTruthy();
    expect(compiled.querySelector('app-map')).toBeTruthy();
  });
});
