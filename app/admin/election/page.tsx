'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { useElectionConfig, UpdateElectionConfigData } from '@/app/hooks/useElectionConfig';
import { FaSave, FaSync } from 'react-icons/fa';

export default function ElectionPage() {
  const { config, status, isLoading, error, updateConfig, refresh } = useElectionConfig();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState<UpdateElectionConfigData>({
    mode: 'manual',
    manualOpen: false,
    startAt: null,
    endAt: null,
  });

  // تحديث البيانات عند تغيير config
  useEffect(() => {
    if (config) {
      setFormData({
        mode: config.mode,
        manualOpen: config.manualOpen,
        startAt: config.startAt || null,
        endAt: config.endAt || null,
      });
    }
  }, [config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await updateConfig(formData);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err: any) {
      setSaveError(err.message || 'حدث خطأ في حفظ الإعدادات.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleModeChange = (mode: 'manual' | 'scheduled') => {
    setFormData((prev) => ({
      ...prev,
      mode,
      // عند التبديل إلى scheduled، إزالة manualOpen
      ...(mode === 'scheduled' ? { manualOpen: false } : {}),
    }));
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  };

  const parseDate = (dateString: string) => {
    if (!dateString) {
      return null;
    }
    return new Date(dateString).toISOString();
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-navy-blue">إدارة حالة التصويت</h1>
          <button
            onClick={refresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-navy-blue rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            <FaSync className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-red-800">{error}</p>
          </div>
        )}

        {saveError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-red-800">{saveError}</p>
          </div>
        )}

        {saveSuccess && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-green-800">تم حفظ الإعدادات بنجاح!</p>
          </div>
        )}

        {/* عرض حالة التصويت الحالية */}
        {status && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-navy-blue mb-4">حالة التصويت الحالية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-warm-grey">الحالة:</span>
                <span
                  className={`px-3 py-1 rounded-lg font-bold ${
                    status.isOpen
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {status.isOpen ? 'مفتوح' : 'مغلق'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-warm-grey">الوضع:</span>
                <span className="px-3 py-1 rounded-lg font-bold bg-blue-100 text-blue-800">
                  {status.mode === 'manual' ? 'يدوي' : 'تلقائي'}
                </span>
              </div>
              {status.startAt && (
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-warm-grey">تاريخ البدء:</span>
                  <span className="text-navy-blue">
                    {new Date(status.startAt).toLocaleString('ar-SA', {
                      timeZone: status.timezone,
                      dateStyle: 'full',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              )}
              {status.endAt && (
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-warm-grey">تاريخ الانتهاء:</span>
                  <span className="text-navy-blue">
                    {new Date(status.endAt).toLocaleString('ar-SA', {
                      timeZone: status.timezone,
                      dateStyle: 'full',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* نموذج تعديل الإعدادات */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-navy-blue mb-6">تعديل إعدادات التصويت</h2>

          {isLoading && !config ? (
            <div className="text-center py-8">
              <p className="text-warm-grey">جاري التحميل...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* وضع التصويت */}
              <div>
                <label className="block text-sm font-bold text-navy-blue mb-3">
                  وضع التصويت
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="manual"
                      checked={formData.mode === 'manual'}
                      onChange={() => {
                        handleModeChange('manual');
                      }}
                      className="w-4 h-4 text-turquoise focus:ring-turquoise"
                    />
                    <span className="font-semibold text-navy-blue">يدوي</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="scheduled"
                      checked={formData.mode === 'scheduled'}
                      onChange={() => {
                        handleModeChange('scheduled');
                      }}
                      className="w-4 h-4 text-turquoise focus:ring-turquoise"
                    />
                    <span className="font-semibold text-navy-blue">تلقائي</span>
                  </label>
                </div>
              </div>

              {/* فتح يدوي (فقط في الوضع اليدوي) */}
              {formData.mode === 'manual' && (
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.manualOpen || false}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          manualOpen: e.target.checked,
                        }));
                      }}
                      className="w-5 h-5 text-turquoise focus:ring-turquoise rounded"
                    />
                    <span className="font-semibold text-navy-blue">فتح التصويت يدوياً</span>
                  </label>
                  <p className="text-sm text-warm-grey mt-2">
                    عند تفعيل هذا الخيار، سيتم فتح التصويت فوراً بغض النظر عن التواريخ
                  </p>
                </div>
              )}

              {/* تاريخ البدء */}
              <div>
                <label className="block text-sm font-bold text-navy-blue mb-2">
                  تاريخ ووقت البدء
                </label>
                <input
                  type="datetime-local"
                  value={formatDate(formData.startAt || null)}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      startAt: parseDate(e.target.value),
                    }));
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none"
                />
                <p className="text-sm text-warm-grey mt-2">
                  في الوضع التلقائي، سيتم فتح التصويت تلقائياً عند هذا التاريخ
                </p>
              </div>

              {/* تاريخ الانتهاء */}
              <div>
                <label className="block text-sm font-bold text-navy-blue mb-2">
                  تاريخ ووقت الانتهاء
                </label>
                <input
                  type="datetime-local"
                  value={formatDate(formData.endAt || null)}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      endAt: parseDate(e.target.value),
                    }));
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none"
                />
                <p className="text-sm text-warm-grey mt-2">
                  في الوضع التلقائي، سيتم إغلاق التصويت تلقائياً عند هذا التاريخ
                </p>
              </div>

              {/* زر الحفظ */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSaving || isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-turquoise text-white rounded-xl font-bold hover:shadow-lg hover:shadow-turquoise/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave className="w-4 h-4" />
                  {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
