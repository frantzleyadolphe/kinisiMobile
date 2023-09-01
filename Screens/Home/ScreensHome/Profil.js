import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
} from "react-native";
import React, { useContext,useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "../style";
import { AuthContext } from "../../../context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={HomeStyle.modalBackGround}>
        <Animated.View
          style={[
            HomeStyle.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const Profil = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView style={HomeStyle.colorPage}>
      <View style={HomeStyle.Page}>
        <View style={HomeStyle.Header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={32}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
          <Text style={HomeStyle.TextHeader}>Profil</Text>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={32}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Image
            style={HomeStyle.avatarProfil}
            source={require("../../../assets/avatar.png")}
          />
        </View>
        <View style={HomeStyle.viewProfil}>
          {/* modal popup */}
          <ModalPoup visible={visible}>
            <View style={{ alignItems: "center" }}>
              <View style={HomeStyle.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require("../../../assets/x.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../assets/success.png")}
                style={{ height: 150, width: 150, marginVertical: 10 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Congratulations registration was successful
            </Text>
          </ModalPoup>

          <View style={HomeStyle.profilView}>
            <TouchableOpacity
              style={HomeStyle.row}
              onPress={() => setVisible(true)}
            >
              <Ionicons
                name="person-circle-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>
                Editer mes informations personnels
              </Text>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.profilView}>
            <TouchableOpacity style={HomeStyle.row}>
              <Ionicons
                name="notifications-circle-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Mes notifications</Text>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.profilView}>
            <TouchableOpacity style={HomeStyle.row}>
              <Ionicons
                name="settings-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Parametres</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={HomeStyle.row}>
              <Ionicons
                name="language-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Langues</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "60%", paddingTop: 20 }}>
          <TouchableOpacity onPress={logout} style={HomeStyle.btnDecon}>
            <Ionicons
              name="log-out-outline"
              size={38}
              style={HomeStyle.iconProfil}
            />
            <Text style={HomeStyle.text}>Deconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profil;
