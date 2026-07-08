import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Event } from '../../models/entity/event';
import { EventService } from '../../services/event.service';

export interface EventDetailData {
  event: Event;
}

export const eventDetailResolver: ResolveFn<EventDetailData> = async (route) => {
  const eventService = inject(EventService);
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Event ID is required');
  }

  const event = await eventService.getEvent(id);

  return {
    event,
  };
};
