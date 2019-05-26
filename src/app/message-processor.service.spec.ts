import { TestBed, inject, async } from '@angular/core/testing';
import { MessageProcessorService } from './message-processor.service';
import { HttpClientModule } from '@angular/common/http';


describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageProcessorService], imports: [HttpClientModule]
    });
  });

  it('should be created', inject([MessageProcessorService], (service: MessageProcessorService) => {
    expect(service).toBeTruthy();
  }));

  it('getGiftColor', inject([MessageProcessorService], (service: MessageProcessorService) => {
    service.customGiftLevel.sort((a, b) => b.value - a.value);
    expect(service.getGiftColor(50)).toEqual('#00bfa5');
  }));


});
