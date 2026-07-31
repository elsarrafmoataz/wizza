import { useMemo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useLanguage } from "../../lib/hooks/useLanguage";

type Point = { lat: number; lng: number };

type Props = {
  point: Point | null;
  onPointChange: (point: Point) => void;
};

export function MapPicker({ point, onPointChange }: Props) {
  const { t } = useLanguage();

  const latValue = useMemo(() => (point ? String(point.lat) : ""), [point]);
  const lngValue = useMemo(() => (point ? String(point.lng) : ""), [point]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t("الخريطة التفاعلية غير متاحة على الويب")}</Text>
        <Text style={styles.subtitle}>
          {t("استخدم موقعك الحالي أو أدخل الإحداثيات يدويًا للاستمرار في البحث عن العقارات بالقرب منك.")}
        </Text>

        <View style={styles.fieldsRow}>
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>{t("خط العرض")}</Text>
            <TextInput
              style={styles.input}
              value={latValue}
              placeholder="30.0444"
              keyboardType="decimal-pad"
              onChangeText={(value) => {
                const lat = Number(value);
                if (!Number.isNaN(lat)) {
                  onPointChange({ lat, lng: point?.lng ?? 31.2357 });
                }
              }}
            />
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>{t("خط الطول")}</Text>
            <TextInput
              style={styles.input}
              value={lngValue}
              placeholder="31.2357"
              keyboardType="decimal-pad"
              onChangeText={(value) => {
                const lng = Number(value);
                if (!Number.isNaN(lng)) {
                  onPointChange({ lat: point?.lat ?? 30.0444, lng });
                }
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: { fontSize: 14, fontWeight: "900", color: "#111827", marginBottom: 6 },
  subtitle: { fontSize: 12.5, color: "#6b7280", lineHeight: 19 },
  fieldsRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  fieldWrap: { flex: 1 },
  fieldLabel: { fontSize: 11.5, fontWeight: "800", color: "#374151", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: "#111827",
  },
});
