import React, { useState, forwardRef } from "react";
import { View } from "react-native";
import Button from "@/components/Button";
import ConfirmationModal from "@/components/ConfirmationModal";
import { AntDesign } from "@expo/vector-icons";

type ConfirmableButtonProps = {
  buttonText: string;
  onConfirm: () => void;
};

const ConfirmableButton = forwardRef(
  (
    {
      buttonText,
      onConfirm,
      modalProps,
      active,
      color,
      ...buttonProps
    }: ConfirmableButtonProps,
    ref
  ) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleButtonPress = () => {
      setModalVisible(true);
    };

    const handleConfirm = () => {
      setModalVisible(false);
      onConfirm();
    };

    return (
      <View>
        <Button
          ref={ref}
          onPress={() => (active ? handleButtonPress() : null)}
          texto={buttonText}
          cor={color}
          line={20}
          active={active}
          {...buttonProps}
        >
          <AntDesign name="checkcircleo" size={16} color="white" />
        </Button>
        <ConfirmationModal
          visible={modalVisible}
          onConfirm={handleConfirm}
          onCancel={() => setModalVisible(false)}
          {...modalProps}
        />
      </View>
    );
  }
);

export default ConfirmableButton;
