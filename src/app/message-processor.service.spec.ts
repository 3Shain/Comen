import { TestBed, inject, async } from '@angular/core/testing';
import { MessageProcessorService } from './message-processor.service';
import { HttpClientModule } from '@angular/common/http';


describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageProcessorService],imports:[HttpClientModule]
    });
  });

  it('should be created', inject([MessageProcessorService], (service: MessageProcessorService) => {
    expect(service).toBeTruthy();
  }));

  it('getGiftColor 0', inject([MessageProcessorService], (service: MessageProcessorService) => {
    expect(service.getGiftColor(0)).toEqual('#00b8d4');
  }));


});