#include <sstream>
#include <string>

#include <v8.h>
#include <node.h>

using namespace node;
using namespace v8;
using namespace std;

namespace rutabaga_matcher {

    class Matcher: ObjectWrap {
    public:

        static Handle<Value> New(const Arguments& args) {
            HandleScope scope;
            Matcher* m = new Matcher();
            m->Wrap(args.This());
            return args.This();
        }

        static Handle<Value> Match(const Arguments& args) {
            HandleScope scope;

            Matcher* m = ObjectWrap::Unwrap<Matcher>(args.This());
            std::ostringstream fn;


            Local<Object> request = args[0].As<Object>();
            Local<Object> user = args[1].As<Object>();
            Local<Object> rule = args[2].As<Object>();
            Local<Value> condition = rule->Get(String::New("rule")); // Get "rule" property from object
            String::Utf8Value condition_str(condition.As<String>());

            // Matcher algorithm may vary
            fn << "(function(request, user, rule) { ";
            fn << "return " << string(*condition_str, condition_str.length())<< ";";
            fn << "});";

            Handle<Function> f = Script::Compile(String::New(fn.str().c_str()))->Run().As<Function>();
            Handle<Value> arg[] = {request, user, rule};
            Handle<Value> result = f->Call(f, 3 , arg);
            return scope.Close(result);
        }


        static void Initialize(Handle<Object> target) {
            HandleScope scope;

            Local<FunctionTemplate> t = FunctionTemplate::New(New);
            t->SetClassName(String::New("Matcher"));
            t->InstanceTemplate()->SetInternalFieldCount(1);
            
            NODE_SET_PROTOTYPE_METHOD(t, "match", Match);

            target->Set(String::NewSymbol("Matcher"), t->GetFunction());
        }
    };
    
} // end namespace

extern "C" void init(Handle<Object> target) {
    HandleScope scope;
    rutabaga_matcher::Matcher::Initialize(target);
}
