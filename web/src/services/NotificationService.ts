import {
  NotificationRefProps,
  NotificationType,
} from "components/Notification";

class NotificationService {
  private ref!: NotificationRefProps | null;

  public notity(title: string, type: NotificationType, duration = 5000): void {
    this.ref?.notify(title, type, duration);
  }

  public setRef(ref: NotificationRefProps | null): void {
    this.ref = ref;
  }
}

export default new NotificationService();
