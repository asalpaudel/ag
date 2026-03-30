import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TextInput,
    TouchableOpacity, ActivityIndicator, Alert, Modal, FlatList,
} from 'react-native';
import axios from 'axios';
import { API_BASE } from '../config';
import { getToken } from '../auth';

interface PaymentMethod { id: string; name: string; }
interface WithdrawLimits { min: number; max: number; }

export default function WithdrawScreen() {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [limits, setLimits] = useState<WithdrawLimits>({ min: 20, max: 5000 });
    const [amount, setAmount] = useState('');
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showMethodPicker, setShowMethodPicker] = useState(false);

    useEffect(() => {
        Promise.all([
            axios.get<PaymentMethod[]>(`${API_BASE}/payment-methods`),
            axios.get<{ key: string; value: string }[]>(`${API_BASE}/settings/public`).catch(() => ({ data: [] })),
        ]).then(([methodsRes, settingsRes]) => {
            setPaymentMethods(methodsRes.data);
            if (methodsRes.data.length > 0) setSelectedMethod(methodsRes.data[0]);

            const settingsArr = Array.isArray(settingsRes.data) ? settingsRes.data : [];
            const minEntry = settingsArr.find((s: { key: string }) => s.key === 'WITHDRAW_MIN');
            const maxEntry = settingsArr.find((s: { key: string }) => s.key === 'WITHDRAW_MAX');
            setLimits({
                min: minEntry ? parseFloat(minEntry.value) : 20,
                max: maxEntry ? parseFloat(maxEntry.value) : 5000,
            });
        }).catch(() => {
            Alert.alert('Error', 'Failed to load data. Please try again.');
        }).finally(() => setLoading(false));
    }, []);

    const handleSubmit = async () => {
        const token = await getToken();
        if (!token) {
            Alert.alert('Not Logged In', 'Please log in to submit a withdraw request.');
            return;
        }
        if (!selectedMethod) {
            Alert.alert('Missing Info', 'Please select a payment method.');
            return;
        }
        if (!tag.trim()) {
            Alert.alert('Missing Info', 'Please enter your payout tag.');
            return;
        }
        const parsedAmount = parseFloat(amount);
        if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount.');
            return;
        }
        if (parsedAmount < limits.min) {
            Alert.alert('Amount Too Low', `Minimum withdrawal is $${limits.min}.`);
            return;
        }
        if (parsedAmount > limits.max) {
            Alert.alert('Amount Too High', `Maximum withdrawal is $${limits.max}.`);
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(
                `${API_BASE}/orders/withdraw`,
                { paymentMethodId: selectedMethod.id, payoutTag: tag.trim(), amount: parsedAmount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Success', 'Withdraw request submitted! An agent will process it shortly.');
            setAmount('');
            setTag('');
        } catch (err: unknown) {
            const axiosErr = err as { response?: { data?: { message?: string } } };
            Alert.alert('Error', axiosErr.response?.data?.message || 'Failed to submit request.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#16a34a" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Request Withdraw</Text>

                <View style={styles.alert}>
                    <Text style={styles.alertText}>Current Limits: Min ${limits.min} — Max ${limits.max}</Text>
                </View>

                <Text style={styles.label}>Receiving Method</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => setShowMethodPicker(true)}>
                    <Text style={styles.dropdownText}>{selectedMethod?.name || 'Select a method'}</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Your Payout Tag</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. $JohnDoe"
                    value={tag}
                    onChangeText={setTag}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Amount ($)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder={`e.g. 100 (min $${limits.min})`}
                    value={amount}
                    onChangeText={setAmount}
                />

                <TouchableOpacity
                    style={[styles.button, submitting && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={submitting}
                >
                    {submitting
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.buttonText}>Submit Request</Text>
                    }
                </TouchableOpacity>
            </View>

            {/* Payment Method Picker Modal */}
            <Modal visible={showMethodPicker} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Receiving Method</Text>
                        <FlatList
                            data={paymentMethods}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => { setSelectedMethod(item); setShowMethodPicker(false); }}
                                >
                                    <Text style={[styles.modalItemText, selectedMethod?.id === item.id && styles.selectedText]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setShowMethodPicker(false)}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 12, color: '#64748b' },
    content: { padding: 24, paddingTop: 40 },
    header: { fontSize: 24, fontWeight: '700', color: '#1e293b', marginBottom: 16 },
    alert: { backgroundColor: '#dcfce3', padding: 12, borderRadius: 8, marginBottom: 16 },
    alertText: { color: '#166534', fontSize: 14, fontWeight: '600' },
    label: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 8, marginTop: 12 },
    dropdown: { backgroundColor: '#fff', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    dropdownText: { color: '#0f172a', fontSize: 16 },
    chevron: { color: '#94a3b8', fontSize: 20 },
    input: { backgroundColor: '#fff', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', fontSize: 16 },
    button: { backgroundColor: '#16a34a', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 32 },
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, maxHeight: '70%' },
    modalTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 16 },
    modalItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    modalItemText: { fontSize: 16, color: '#334155' },
    selectedText: { color: '#16a34a', fontWeight: '700' },
    modalCancel: { marginTop: 12, padding: 14, alignItems: 'center' },
    modalCancelText: { color: '#ef4444', fontWeight: '600', fontSize: 16 },
});
