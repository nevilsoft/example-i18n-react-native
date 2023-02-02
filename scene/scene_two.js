import { I18n } from "i18n-js"
const i18n = new I18n()

const en = {
  hello: "Hello"
}

const th = {
  hello: "สวัสดี"
}

const Scene_two = () => {

  i18n.translations = { en, th };
  return (
    <view>
      <Text>
        {i18n.t("hello")} Scene Two
      </Text>
    </view>
  )
}

export default Scene_two
