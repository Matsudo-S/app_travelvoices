import Toast from './toast'

export default function ToastPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Toast Component Demo</h1>
      <div className="space-y-4">
        <Toast message="これは情報メッセージです" type="info" show={true} />
        <Toast message="これは成功メッセージです" type="success" show={true} />
      </div>
    </div>
  )
}
