export interface PrimaryData {
	type: 'text'
	text: string
}

export interface Data {
	elements: [
		{
			name: 'departamentos'
			elements: {
				name: 'departamento'
				elements: (
					| {
							name: 'nombre' | 'capital_total'
							elements: [PrimaryData]
					  }
					| {
							name: 'puestos'
							elements: {
								name: 'puesto'
								elements: (
									| {
											name: 'nombre' | 'salario'
											elements: [PrimaryData]
									  }
									| {
											name: 'categorias'
											elements: {
												name: 'categoria'
												elements: [
													{
														name: 'nombre'
														elements: [PrimaryData]
													},
												]
											}[]
									  }
									| {
											name: 'requisitos'
											elements: {
												name: 'requisito'
												elements: (
													| {
															name: 'nombre' | 'tamaño' | 'obligatorio'
															elements: [PrimaryData]
													  }
													| {
															name: 'formatos'
															elements: {
																name: 'formato'
																elements: [
																	{
																		name: 'nombre'
																		elements: [PrimaryData]
																	},
																]
															}[]
													  }
												)[]
											}[]
									  }
								)[]
							}[]
					  }
				)[]
			}[]
		},
	]
}

export interface TemporalData {
	Departments: {
		[id: string]: {
			dep_name: string
			total: number
		}
	}
	Jobs: {
		[id: string]: {
			job_name: string
			salary: number
		}
	}
	Categories: {
		[id: string]: {
			category_name: string
		}
	}
	Requirements: {
		[id: string]: {
			req_name: string
			r_size: number
			r_required: number
		}
	}
	Formats: {
		[id: string]: {
			format_name: string
		}
	}
}
