import React, { useImperativeHandle, forwardRef, useState } from "react";
import { useTransition, animated } from "react-spring";

import crypto from "crypto";

import { FiCheckCircle, FiInfo, FiAlertCircle } from "react-icons/fi";

import { Container } from "./styles";

export type NotificationType = "SUCCESS" | "INFO" | "DANGER";

export interface NotificationRefProps {
  notify: (title: string, type: NotificationType, duration: number) => void;
}

interface NotificationData {
  id: string;
  title: string;
  type: NotificationType;
}

function getColorByType(type: NotificationType): string {
  switch (type) {
    case "SUCCESS":
      return "#0F0";
    case "INFO":
      return "#00F";
    case "DANGER":
      return "#F00";
    default:
      return "#000";
  }
}

const Icon: React.FC<{ type: NotificationType; color: string }> = ({
  type,
  color,
}) => {
  switch (type) {
    case "SUCCESS":
      return <FiCheckCircle color={color} size={20} />;
    case "INFO":
      return <FiInfo color={color} size={20} />;
    case "DANGER":
      return <FiAlertCircle color={color} size={20} />;
    default:
      return <FiCheckCircle color={color} size={20} />;
  }
};

const Notification: React.ForwardRefRenderFunction<NotificationRefProps, {}> = (
  props,
  ref
) => {
  const [notifications, setNotification] = useState<NotificationData[]>([]);
  const transitions = useTransition(notifications, (item) => item.id, {
    from: { opacity: 0, transform: "translateX(40px)" },
    enter: { opacity: 1, transform: "translateX(0px)" },
    leave: { opacity: 0, transform: "translateX(40px)" },
    config: {
      tension: 300,
    },
  });
  function notify(title: string, type: NotificationType, duration = 5000) {
    const newNotification: NotificationData = {
      id: crypto.randomBytes(8).toString(),
      title,
      type,
    };

    setTimeout(() => {
      setNotification((oldNotifications) =>
        oldNotifications.filter(
          (notification) => notification.id !== newNotification.id
        )
      );
    }, duration);

    setNotification((oldNotifications) => [
      ...oldNotifications,
      newNotification,
    ]);
  }

  useImperativeHandle(ref, () => ({
    notify,
  }));

  return (
    <Container>
      <ul>
        {transitions.map(({ item, props: transitionProps }) => (
          <animated.li
            style={transitionProps}
            key={item.id}
            className="notification"
          >
            <Icon type={item.type} color={getColorByType(item.type)} />
            <p>{item.title}</p>
          </animated.li>
        ))}
      </ul>
    </Container>
  );
};

export default forwardRef(Notification);
