# SOLID - vscode code base

## Examples
* ---  Single Responsibility Principle ---

You can find the entire file here [VsCode Cancellation File](https://github.com/microsoft/vscode/blob/main/src/vs/base/common/cancellation.ts)
line 60

```ts
class MutableToken implements CancellationToken {

	private _isCancelled: boolean = false;
	private _emitter: Emitter<any> | null = null;

	public cancel() {
		if (!this._isCancelled) {
			this._isCancelled = true;
			if (this._emitter) {
				this._emitter.fire(undefined);
				this.dispose();
			}
		}
	}

	get isCancellationRequested(): boolean {
		return this._isCancelled;
	}

	get onCancellationRequested(): Event<any> {
		if (this._isCancelled) {
			return shortcutEvent;
		}
		if (!this._emitter) {
			this._emitter = new Emitter<any>();
		}
		return this._emitter.event;
	}

	public dispose(): void {
		if (this._emitter) {
			this._emitter.dispose();
			this._emitter = null;
		}
	}
}
```

* ---  Open / Closed Principle  ---

They do not overload the class methods, but they do structure a dispose function that changes depending on the dispose <br>
As well as classes are not being modified by other classes <br>
Full file here [Vs Code Lifecycle](https://github.com/microsoft/vscode/blob/main/src/vs/base/common/lifecycle.ts)

```ts
export interface IDisposable {
	dispose(): void;
}

export class DisposableStore implements IDisposable {
	private _isDisposed = false;

	constructor() {
		trackDisposable(this);
	}

	public dispose(): void {
		if (this._isDisposed) {
			return;
		}

		markAsDisposed(this);
		this._isDisposed = true;
		this.clear();
	}

}

export abstract class Disposable implements IDisposable {

	static readonly None = Object.freeze<IDisposable>({ dispose() { } });

	protected readonly _store = new DisposableStore();

	constructor() {
		trackDisposable(this);
		setParentOfDisposable(this._store, this);
	}

	public dispose(): void {
		markAsDisposed(this);

		this._store.dispose();
	}
}

export class MutableDisposable<T extends IDisposable> implements IDisposable {
	private _value?: T;
	private _isDisposed = false;

	constructor() {
		trackDisposable(this);
	}

	dispose(): void {
		this._isDisposed = true;
		markAsDisposed(this);
		this._value?.dispose();
		this._value = undefined;
	}
}
```

* ---  Liskov Substitution Principle  --- 

This two classes are inherint from the Error built-in Class, they could be replace by its parent <br>
Full file here [Vs Code Errors](https://github.com/microsoft/vscode/blob/main/src/vs/base/common/errors.ts)

```ts
export class CancellationError extends Error {
	constructor() {
		super(canceledName);
		this.name = this.message;
	}
}

export class BugIndicatingError extends Error {
	constructor(message?: string) {
		super(message || 'An unexpected bug occurred.');
	}
}
```

* ---  Interface Seggregation Principle  ---

Here depending on the Action extends the functionality of the Disposable <br>
File [Vs Code Actions](https://github.com/microsoft/vscode/blob/main/src/vs/base/common/actions.ts)

```ts
export interface IDisposable {
	dispose(): void;
}

export interface IAction extends IDisposable {
	readonly id: string;
	label: string;
	tooltip: string;
	class: string | undefined;
	enabled: boolean;
	checked?: boolean;
	run(event?: unknown): unknown;
}

export interface IActionRunner extends IDisposable {
	readonly onDidRun: Event<IRunEvent>;
	readonly onBeforeRun: Event<IRunEvent>;

	run(action: IAction, context?: unknown): unknown;
}
```

* ---  Dependency Inversion Principle  --- 

Most of the code, is written in a way that seems to not depend (they received the information instead of hardcode it). But some processes seems to depend in others

## Violations
* ---  Single Responsibility Principle  --- 

This file is in charge of too many things [Vs Code Main](https://github.com/microsoft/vscode/blob/main/src/vs/code/electron-main/main.ts)

* ---  Open / Closed Principle  ---

Not found so far, (Vs code, code base is huge) ✌🏼

* ---  Liskov Substitution Principle  ---

I t doesn't look like they have violations for this principle ✌🏼. They do not rely on having subclasses that behave exactly as the parent

* ---  Interface Seggregation Principle  ---

There are no classes that are implementing things for various scenarios ✌🏼

* ---  Dependency Inversion Principle  ---

Main App seems to have many dependencies <br>
(Vs Code App)[https://github.com/microsoft/vscode/blob/main/src/vs/code/electron-main/app.ts]

## Refactors (?)

* I would organize more the file system 
* With a more organized file system, I will break the main file into a folder, and convert each action into a separate class. Or group the actions that are related (prepare services, with get Services -- Views - Cache - Listeners ... etc )
* Better names for the files (You dont know if is a fyle of types, or utils or a class)